//
//  IndividualVideoActivity.swift
//  Segnaventura
//
//  Created by Christopher Pedraza on 18/09/23.
//

import SwiftUI

// Vista individual de una parte de la actividad de videos
// Vista individual de una parte de la actividad de preguntas
struct IndividualQuizActivity: View {
    
    //let videoID: String
    let preguntasArr: PreguntasPalabrasVideosArr
    @Binding var correctAnswers: Int
    @Binding var questionCorrectAnswers: [Int]
    @Binding var currentQuestionIndex: Int // Binding for tracking the current question
    @State var correctAnswerVideo: Bool = false
    @State var bindingTapped: Bool = false
     
    var body: some View {
        VStack {
            let randomNumber = Int.random(in: 0...1)
            // Video de youtube de la parte
            if (currentQuestionIndex < preguntasArr.preguntas.count){
                
                
                
                if(randomNumber==0){
                    VideoView(videoID: preguntasArr.preguntas[currentQuestionIndex].id_video)
                        .frame(minHeight: 0, maxHeight: UIScreen.main.bounds.height * 0.3)
                        .cornerRadius(12)
                        .padding(.horizontal, 24)
                }
                if(randomNumber==1){
                    Text(preguntasArr.preguntas[currentQuestionIndex].pregunta)
                }
                
                
                // Display the current question
                
                if currentQuestionIndex < preguntasArr.preguntas.count {
                    if(randomNumber == 0){
                        let pregunta = preguntasArr.preguntas[currentQuestionIndex]
                        //Text(pregunta.pregunta)
                        
                        // Iterate over the answers for the current question
                        List(preguntasArr.preguntas.indices, id: \.self) { index in
                            if index == currentQuestionIndex {
                                // Display answers for the current question
                                let pregunta = preguntasArr.preguntas[currentQuestionIndex]
                                ForEach(pregunta.respuestas.indices, id: \.self) { answerIndex in
                                    let respuesta = pregunta.respuestas[answerIndex]
                                    QuizButton(
                                        randomNum: randomNumber, text: respuesta.respuesta_palabra,
                                        video_id: respuesta.respuesta_video,
                                        esCorrecta: respuesta.esCorrecta,
                                        numeroArr: preguntasArr.preguntas.count ,
                                        preguntasArr: preguntasArr,
                                        correctAnswers: $correctAnswers,
                                        questionCorrectAnswers: $questionCorrectAnswers,
                                        currentQuestionIndex: $currentQuestionIndex,
                                        cantidadCorrectas: pregunta.cantidadCorrectas,
                                        correctAnswerVideo: $correctAnswerVideo,
                                        bindingTapped: $bindingTapped
                                    )
                                }
                            }
                        }
                    }
                    
                    if(randomNumber == 1){
                        let pregunta = preguntasArr.preguntas[currentQuestionIndex]
                        
                        Text(pregunta.pregunta)
                            .font(.system(size:35))
                        
                        
                        
                        
                        List(preguntasArr.preguntas.indices, id: \.self) { index in
                            if index == currentQuestionIndex {
                                // Display answers for the current question
                                let pregunta = preguntasArr.preguntas[currentQuestionIndex]
                                ForEach(pregunta.respuestas.indices, id: \.self) { answerIndex in
                                    let respuesta = pregunta.respuestas[answerIndex]
                                    QuizButton(
                                        randomNum: randomNumber, text: respuesta.respuesta_palabra,
                                        video_id: respuesta.respuesta_video,
                                        esCorrecta: respuesta.esCorrecta,
                                        numeroArr: preguntasArr.preguntas.count ,
                                        preguntasArr: preguntasArr,
                                        correctAnswers: $correctAnswers,
                                        questionCorrectAnswers: $questionCorrectAnswers,
                                        currentQuestionIndex: $currentQuestionIndex,
                                        cantidadCorrectas: pregunta.cantidadCorrectas,
                                        correctAnswerVideo: $correctAnswerVideo,
                                        bindingTapped: $bindingTapped
                                    )
                                    /*.listRowBackground(correctAnswerVideo && bindingTapped ? Color.green : (!correctAnswerVideo && bindingTapped) ? Color.red : Color.white)*/

                                    
                                 
                                    
                                    .frame(height: 140)
                                    

                                    

                                   // .listRowInsets(EdgeInsets(top: 25, leading: 0, bottom: 25, trailing: 0)) // Adjust top and bottom insets as needed
                                    

                                }
                            }
                            
                        }
                        
                        
                        //.frame(height: 900)
                        
                        
                    }
                    
                    
                }
                
            }
        }
    }
}


// View de boton customizado
struct QuizButton: View {
    // Variable de estado para saber si ya se presiono el boton o no
    @State private var didTap : Bool = false
    @State private var isCorrectAnswerSelected : Bool = false
    let randomNum : Int
    let text : String
    let video_id : String
    let esCorrecta : Bool
    let numeroArr : Int
    let preguntasArr: PreguntasPalabrasVideosArr
  //  let questionIndex : Int // Use questionIndex instead of index
    
    // Color por defecto al inicio
    private let colorDefault : Color = Color.black
    private let colorGris = Color(red: 217.0 / 255.0, green: 217.0 / 255.0, blue: 217.0 / 255.0)

    
    @Binding var correctAnswers : Int
    @Binding var questionCorrectAnswers : [Int]
    @Binding var currentQuestionIndex: Int
    var cantidadCorrectas: Int
    @Binding var correctAnswerVideo: Bool
    @Binding var bindingTapped: Bool
    
    
    
    var body: some View {
        
        // Si se presiona, cambia el valor booleano de didTap y si es una respuesta
        // correcta, aumenta el contador de respuesta correctas global y por preguntas
        Button(action: {
            self.didTap = true
                bindingTapped = true
            if esCorrecta {
                isCorrectAnswerSelected = true
                correctAnswerVideo = true
                
                print(numeroArr)
                correctAnswers += 1
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.75) {
                           // Introduce a delay of 0.5 seconds before changing the current question
                           questionCorrectAnswers[currentQuestionIndex] += 1
                           if currentQuestionIndex < preguntasArr.preguntas.count {
                               currentQuestionIndex += 1
                           }
                           isCorrectAnswerSelected = true
                       }
                   }
                
                
        }) {
            
            if(randomNum == 0){
                Text(text)
                    .font(.system(size: 24))
                    .foregroundColor(
                        !didTap ? Color.black :
                               (didTap && isCorrectAnswerSelected) ? Color.green :
                               (didTap && !isCorrectAnswerSelected) ? Color.red :
                               Color.black
                                    
                            )
            }
            
            if(randomNum == 1){
                
                HStack{
                    VideoView(videoID: video_id)
                    
                        .frame(minHeight: 0, maxHeight: UIScreen.main.bounds.height )
                    
                        .cornerRadius(12)
                
                Text("Seleccionar")
                    
                    .background(colorGris)
                    .cornerRadius(10)
                    .padding(.horizontal,20)
                    .padding(.vertical,2)
                    .font(.system(size: 15))
                    .foregroundColor(
                        !didTap ? Color.black :
                               (didTap && isCorrectAnswerSelected) ? Color.green :
                               (didTap && !isCorrectAnswerSelected) ? Color.red :
                               Color.black
                                    
                            )
                }
                   
                    
                    
               
            }
            
            
        }
        // Dependiendo si es una respuesta correcta o no, y si ya se presiono
        // se cambia el color del boton
        
        // Se deshabilita el boton cuando la pregunta ya tiene todas sus respuestas
        // correctas contestadas
        //.disabled(questionCorrectAnswers[questionIndex] == cantidadCorrectas) // Use questionIndex
    }
}
