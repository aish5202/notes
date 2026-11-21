import os
import unittest
from types import SimpleNamespace
from unittest.mock import patch

os.environ.setdefault("GROQ_API_KEY", "test-key")

from fastapi.testclient import TestClient

import main


class ApiTests(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(main.app)

    def test_home_returns_notes_count(self):
        with patch.object(main.collection, "count", return_value=7):
            response = self.client.get("/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "running", "pieces": 7})

    def test_ask_returns_answer_and_sources(self):
        results = {
            "documents": [["A note about photosynthesis."]],
            "metadatas": [[{"source": "biology.pdf", "page": 2}]],
        }
        reply = SimpleNamespace(
            choices=[
                SimpleNamespace(
                    message=SimpleNamespace(content="Plants use sunlight. For example, leaves make food.")
                )
            ]
        )

        with (
            patch.object(main.collection, "query", return_value=results),
            patch.object(main.ai.chat.completions, "create", return_value=reply) as create,
        ):
            response = self.client.post("/ask", json={"question": "What is photosynthesis?"})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            {
                "answer": "Plants use sunlight. For example, leaves make food.",
                "sources": [{"source": "biology.pdf", "page": 2}],
            },
        )
        prompt = create.call_args.kwargs["messages"][0]["content"]
        self.assertIn("friendly teacher", prompt)
        self.assertIn("simple words", prompt)

    def test_ask_requires_question(self):
        response = self.client.post("/ask", json={})

        self.assertEqual(response.status_code, 422)


if __name__ == "__main__":
    unittest.main()
