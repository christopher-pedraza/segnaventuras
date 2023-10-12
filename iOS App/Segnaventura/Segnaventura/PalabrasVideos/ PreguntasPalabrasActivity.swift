//
//   VideosActivity.swift
//  Segnaventura
//
//  Created by Christopher Pedraza on 17/09/23.
//

import SwiftUI

struct PreguntasPalabrasActivity: View {
    // Modelo con los datos del JSON para la actividad
   // @EnvironmentObject var VideoVM : VideoViewModel
    @EnvironmentObject var PalabrasVideosVM: PalabraVideosViewModel
    // Variable para llevar un registr  o de la cantidad de respuestas
    // correctas que se llevan en todas las preguntas
    
    //  let videoID: String
    @State private var correctAnswers: Int = 0
    @State private var questionCorrectAnswers: [Int] = Array(repeating: 0, count: 100)

    @State private var currentQuestionIndex: Int = 0
    @State private var quizFinished: Bool = false
    
    @State private var correctAnswerVideo: Bool = false
    @State private var bindingTapped: Bool = false
    
    
    var body: some View {
            VStack {
                if currentQuestionIndex < PalabrasVideosVM.palabras.count {
                    let currentPreguntasArr = generateQuestionsForPalabras(PalabrasVideosVM.palabras)
                    
                    IndividualQuizActivity(
                            preguntasArr: currentPreguntasArr,
                            correctAnswers: $correctAnswers,
                            questionCorrectAnswers: $questionCorrectAnswers,
                            currentQuestionIndex: $currentQuestionIndex
                    )
                    
                } else {
                    // Display the end of the activity when all questions are answered
                   VideoActivityEnd(correctAnswers: $correctAnswers, maxCorrectas: PalabrasVideosVM.palabras.count) // Navigate to the next view
                    
                        
                    
                    
                    // You can also add a button to manually trigger the navigation if needed
                    
                }
            }
            .onAppear(perform: downloadVideos)
        }
    
    // Funcion para descargar los datos de los videos usando el ViewModel
    func downloadVideos() {
        Task {
            do {
            //    try await VideoVM.getVideosData()
                try await PalabrasVideosVM.getPalabrasVideos()
            } catch {
            }
        }
    }

    
    func generateQuestionsForPalabras(_ palabras: [PalabrasVideosModel]) -> PreguntasPalabrasVideosArr {
        var questions = [PreguntaPalabrasVideos]()

        for palabra in palabras {
            // Create a Respuesta instance for the correct answer
            let correctAnswer = RespuestaPalabrasVideos(respuesta_palabra:palabra.palabra,respuesta_video: palabra.id_video_segna, esCorrecta: true)
            // Create Respuesta instances for three incorrect answers
            var incorrectRespuestas = [RespuestaPalabrasVideos]()

            // Shuffle the remaining palabras to select three distinct incorrect answers
            var remainingPalabras = palabras.filter { $0 != palabra }
            remainingPalabras.shuffle()

            for _ in 0..<3 {
                if let incorrectPalabra = remainingPalabras.popLast() {
                    incorrectRespuestas.append(RespuestaPalabrasVideos(respuesta_palabra: incorrectPalabra.palabra,respuesta_video: incorrectPalabra.id_video_segna, esCorrecta: false))
                }
            }

            // Combine the correct and incorrect answers
            var allAnswers = incorrectRespuestas
            allAnswers.append(correctAnswer)

            // Shuffle the answers to randomize their order
            let shuffledAnswers = allAnswers.shuffled()

            // Create the question with the shuffled answers
            let pregunta = PreguntaPalabrasVideos(pregunta: palabra.palabra, id_video: palabra.id_video_segna, cantidadCorrectas: 1, respuestas: shuffledAnswers)

            questions.append(pregunta)
        }

        // Create and return the PreguntasPalabrasVideosArr object
        let preguntasArr = PreguntasPalabrasVideosArr(preguntas: questions)
        return preguntasArr
    }




}
