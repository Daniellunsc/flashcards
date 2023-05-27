(ns flashcards.flashcards 
  (:require [clojure.set :as set]
            [flashcards.flashcards :as flashcards]
            [flashcards.interaction :as interaction]))

(defn calculate-match-score [response answer]
  (let [response-len (count response)
        common-len (count (clojure.set/intersection (set response) (set answer)))]
    (if (zero? response-len)
      0
      (/ (* 100 common-len) response-len))))

(defn study-flashcards [flashcards]
  (let [shuffled-flashcards (shuffle flashcards)]
    (doseq [flashcard shuffled-flashcards]
      (let [user-answer (interaction/ask-question flashcard)
            match-score (calculate-match-score user-answer (:answer flashcard))]
        (if (>= match-score 70)
          (println "Correct answer!")
          (do
            (println "Incorrect answer: " user-answer)
            (interaction/show-correct-answer flashcard))))))
  (println "There is no more flashcards to study! Congrats!"))
