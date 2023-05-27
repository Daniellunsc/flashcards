(ns flashcards.file-utils 
  (:require [clojure.edn :as edn]
            [clojure.java.io :as io]
            [clojure.string :as str]))

(defn build-file-path [dir language]
  (str dir "/" language ".edn"))

(defn read-edn-file [file-path]
  (with-open [reader (io/reader file-path)]
    (let [content (slurp reader)]
      (if (empty? content)
        []
        (edn/read-string content)))))

(defn available-languages
  [dir]
  (let [file-pattern #"^.*\.edn$"
        directory (io/file dir)]
    (->> (file-seq directory)
         (filter #(.isFile %))
         (map #(.getName %))
         (filter #(re-matches file-pattern %))
         (map #(str/replace % #"\.edn%" ""))
         sort)))

(defn load-flashcards [dir language]
  (let [file-path (build-file-path dir language)]
    (if (.exists (io/file file-path))
      (let [flashcards (read-edn-file file-path)]
        (if (seq flashcards)
          flashcards
          (do
            (println "Não há flashcards disponíveis para estudar.")
            [])))
      (do
        (println "O arquivo de idioma não existe.")
        []))))
