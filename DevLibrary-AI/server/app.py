"""Servidor WSGI para el chat de DevLibrary AI. Usa solo la biblioteca estándar."""

import os
from collections import OrderedDict, deque
from dataclasses import dataclass, field
from html import escape
from http.cookies import CookieError, SimpleCookie
from pathlib import Path
from secrets import token_urlsafe
from string import Template
from threading import Lock
from urllib.parse import parse_qs, urlsplit
from wsgiref.simple_server import make_server

from library import match_question

ROOT = Path(__file__).resolve().parents[1]
TEMPLATE = Template(Path(__file__).with_name("chat.html").read_text(encoding="utf-8"))
STATIC = {
    "/biblioteca.html": "text/html",
    "/estados.html": "text/html",
    "/css/styles.css": "text/css",
    "/assets/icons/brand.svg": "image/svg+xml",
}
TEXT_LIMIT = 3000
FORM_LIMIT = 40_000
SESSION_LIMIT = 200


@dataclass
class Conversation:
    turns: deque = field(default_factory=lambda: deque(maxlen=16))
    previous: dict | None = None


conversations = OrderedDict()
conversation_lock = Lock()


def render_turn(question, answer, last=False):
    target = ' id="respuesta" tabindex="-1"' if last else ""
    pieces = [
        '<article class="chat__message chat__message--user"><small>Tú</small>'
        f"<p>{escape(question)}</p></article>",
        f'<article class="chat__message chat__message--assistant"{target}><small>DevLibrary AI · Biblioteca</small>',
    ]
    heading = f'<h3>{escape(answer["title"])}</h3>'
    summary = f'<p>{escape(answer["summary"])}</p>'
    if answer.get("kind") == "unanswered":
        pieces.append(f'<div class="status-box status-box--error">{heading}{summary}</div>')
    else:
        pieces.extend((heading, summary))
    if answer.get("code"):
        pieces.append(f'<pre class="code-block" tabindex="0"><code>{escape(answer["code"])}</code></pre>')
    if answer.get("detail"):
        pieces.append(f'<p>{escape(answer["detail"])}</p>')
    sources = [
        f'<li><a href="{escape(url)}">{escape(title)}</a></li>'
        for title, url in answer.get("sources", ())
        if urlsplit(url).scheme == "https"
    ]
    if sources:
        pieces.append(f'<ul class="chat__sources">{"".join(sources)}</ul>')
    pieces.append("</article>")
    return "".join(pieces)


def session_id(environ):
    jar = SimpleCookie()
    try:
        jar.load(environ.get("HTTP_COOKIE", ""))
    except CookieError:
        return None
    cookie = jar.get("devlibrary")
    return cookie.value if cookie else None


def session_cookie(identifier, secure):
    cookie = f"devlibrary={identifier}; Path=/; HttpOnly; SameSite=Lax"
    return cookie + ("; Secure" if secure else "")


def read_question(environ):
    try:
        size = int(environ.get("CONTENT_LENGTH") or 0)
        if not 0 < size <= FORM_LIMIT:
            return ""
        body = environ["wsgi.input"].read(size).decode("utf-8")
        fields = parse_qs(body, max_num_fields=4, errors="strict")
    except (ValueError, UnicodeError):
        return ""
    return fields.get("pregunta", [""])[0].strip()


def application(environ, start_response):
    method = environ["REQUEST_METHOD"]
    path = environ["PATH_INFO"]

    def respond(status, body=b"", mime="text/plain", headers=()):
        start_response(status, [
            ("Content-Type", mime + "; charset=utf-8"),
            ("Content-Length", str(len(body))),
            ("X-Content-Type-Options", "nosniff"),
            *headers,
        ])
        return [body] if method != "HEAD" else []

    if path in STATIC and method in {"GET", "HEAD"}:
        return respond("200 OK", (ROOT / path.lstrip("/")).read_bytes(), STATIC[path])

    display = path in {"/", "/index.html"} and method in {"GET", "HEAD"}
    submit = path == "/chat" and method == "POST"
    reset = path == "/nueva" and method == "POST"
    if not (display or submit or reset):
        return respond("404 Not Found", b"Recurso no encontrado.")

    question = read_question(environ) if submit else ""
    if submit and not 0 < len(question) <= TEXT_LIMIT:
        return respond("303 See Other", headers=[("Location", "/#consulta")])

    headers = [("Cache-Control", "no-store")]
    with conversation_lock:
        identifier = session_id(environ)
        if identifier not in conversations:
            identifier = token_urlsafe(24)
            conversations[identifier] = Conversation()
            if len(conversations) > SESSION_LIMIT:
                conversations.popitem(last=False)
            headers.append(("Set-Cookie", session_cookie(identifier, environ["wsgi.url_scheme"] == "https")))
        conversations.move_to_end(identifier)
        conversation = conversations[identifier]
        if submit:
            answer = match_question(question, conversation.previous)
            conversation.turns.append((question, answer))
            if answer.get("topics"):
                conversation.previous = answer
        if reset:
            conversations[identifier] = Conversation()
        turns = tuple(conversation.turns)

    if submit or reset:
        return respond("303 See Other", headers=[*headers, ("Location", "/#respuesta" if submit else "/#consulta")])
    page = TEMPLATE.substitute(
        messages="".join(
            render_turn(question, answer, last=index == len(turns) - 1)
            for index, (question, answer) in enumerate(turns)
        ),
        transcript_hidden="" if turns else " hidden",
    )
    return respond("200 OK", page.encode("utf-8"), "text/html", headers)


if __name__ == "__main__":
    host = os.getenv("DEVLIBRARY_HOST", "127.0.0.1")
    port = int(os.getenv("PORT", "8071"))
    with make_server(host, port, application) as server:
        print(f"DevLibrary AI · http://{host}:{port}/", flush=True)
        server.serve_forever()
