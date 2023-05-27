(ns flashcards.study-utils
  (:require [flashcards.flashcards :as flashcards]
            [flashcards.file-utils :as file-utils]))

(defn select-language
  [flashcard-dir]
  (println "Select the language to study:")
  (let [languages (file-utils/available-languages flashcard-dir)]
    (doseq [language languages]
      (println language))
    (println)
    (read-line)))

(defn study-flashcards [flashcard-dir language]
  (let [flashcards (file-utils/load-flashcards flashcard-dir language)]
    (flashcards/study-flashcards flashcards)))

(defn start-study-session [flashcard-dir]
  (let [language (select-language flashcard-dir)]
    (study-flashcards flashcard-dir language)))
