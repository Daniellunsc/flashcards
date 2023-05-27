(ns flashcards.interaction)

(defn ask-question [flashcard]
  (println "Qual é a tradução de:")
  (println (:question flashcard))
  (println "")
  (read-line))

(defn show-correct-answer [flashcard]
  (println "Resposta correta:")
  (println (:answer flashcard))
  (println ""))
