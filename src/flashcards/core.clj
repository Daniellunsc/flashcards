(ns flashcards.core 
  (:require [flashcards.study-utils :as study-utils]))

(defn -main []
  (let [flashcard-dir "resources/languages"]
    (study-utils/start-study-session flashcard-dir)))
