"""Búsqueda de fichas y referencias de DevLibrary AI."""

import json
import re
import unicodedata
from pathlib import Path

CATALOG = json.loads(Path(__file__).with_name("catalogo.json").read_text(encoding="utf-8"))
TECHNOLOGIES = {card["id"]: card for card in CATALOG["technology"]}
ALIASES = CATALOG["aliases"]
CONCEPTS = CATALOG["concepts"]

EXAMPLES = re.compile(
    r"^(?:(?:dame|dime|muestra|muestrame|pon|ponme|quiero|necesito|puedes darme|puedes mostrarme) )?"
    r"(?:(?:un|unos|algunos|otros|varios|dos|tres) )?ejemplos?(?: (?:de|en|con|sobre))?(?: |$)"
    r"|^(?:show me |give me )?(?:some |an )?examples?(?: (?:of|in|with))?(?: |$)"
)
INTRO = re.compile(
    r"^(?:que es|que significa|como funciona|para que sirve|explicame|explica|define|introduccion a"
    r"|quiero aprender(?: sobre)?|hablame de|what is|documentacion(?: de| sobre)?"
    r"|referencias?(?: de| sobre)?|docs(?: de| for)?) "
)


def normalize(text):
    text = unicodedata.normalize("NFD", text.lower())
    text = "".join(char for char in text if not unicodedata.combining(char))
    text = re.sub(r"\bc\+\+", "cplusplus", text)
    text = re.sub(r"\bc#", "csharp", text)
    text = re.sub(r"[\W_]+", " ", text).strip()
    text = re.sub(r"\bjava script\b", "javascript", text)
    return re.sub(r"\b(node|next) js\b", r"\1js", text)


def names(card):
    return {normalize(name) for name in [card["title"], *ALIASES.get(card["id"], ())]}


TECHNOLOGY_NAMES = {key: names(card) for key, card in TECHNOLOGIES.items()}


def match_question(question, previous=None):
    query = normalize(re.sub(r"(?<![.\w])Map\b", "Map objeto", question)).removesuffix(" por favor")
    examples = EXAMPLES.match(query)
    target = INTRO.sub("", query[examples.end():] if examples else query)
    padded_query = f" {query} "
    topics = {
        key for key, aliases in TECHNOLOGY_NAMES.items()
        if target in aliases or any(f" {name} " in padded_query for name in aliases - {"c", "go"})
    }
    previous_topics = previous.get("topics", ()) if previous else ()
    ranked = []
    for card in CONCEPTS:
        card_topics = set(card["topics"])
        if card.get("needsAllTopics"):
            if not card_topics <= topics:
                continue
        elif topics and not card_topics & topics:
            continue
        terms = [normalize(term) for term in card["terms"]]
        score = max((2 * len(term.split()) + (term == target) for term in terms if f" {term} " in padded_query), default=0)
        if score:
            ranked.append((score + (not topics and bool(card_topics.intersection(previous_topics))), card))
    ranked.sort(key=lambda item: item[0], reverse=True)
    if ranked:
        best_score, best = ranked[0]
        if len(ranked) > 1 and ranked[1][0] == best_score:
            other = ranked[1][1]
            return {
                "title": "Aclara tu pregunta",
                "summary": f'¿Quieres saber sobre {best["title"]} o sobre {other["title"]}?',
                "sources": [best["sources"][0], other["sources"][0]],
            }
        return best
    if examples and not target and previous:
        if previous.get("code"):
            return {**previous, "summary": "Este ejemplo muestra el concepto de la ficha anterior."}
        if len(previous_topics) == 1:
            return {**TECHNOLOGIES[previous_topics[0]], "topics": list(previous_topics)}
    if len(topics) == 1:
        topic = next(iter(topics))
        technology = TECHNOLOGIES[topic]
        if target in TECHNOLOGY_NAMES[topic]:
            return {**technology, "topics": [topic]}
    if query in {"hola", "buenas", "buenos dias", "buenas tardes", "buenas noches"}:
        return {"title": "Hola", "summary": "Pregúntame sobre programación. Puedes empezar con «Dame ejemplos de JS»."}
    if topics:
        selected = [card for key, card in TECHNOLOGIES.items() if key in topics][:3]
        return {
            "title": "Documentación de " + " y ".join(card["title"] for card in selected),
            "summary": "No encontré una ficha para ese concepto. Puedes buscarlo en la documentación de la tecnología.",
            "sources": [source for card in selected for source in card["sources"]],
            "topics": [card["id"] for card in selected],
            "kind": "unanswered",
        }
    return {
        "title": "No encontré una respuesta",
        "summary": "Prueba con el nombre de la tecnología y el concepto. Por ejemplo, «¿Cómo se usa console.log en JS?»",
        "kind": "unanswered",
    }
