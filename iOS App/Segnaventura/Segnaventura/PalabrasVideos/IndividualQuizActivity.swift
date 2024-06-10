// ESTE ARCHIVO TIENE EL CÓDIGO DE LA ACTIVIDAD DONDE SE MUESTRA LA SEÑA DE LA PREGUNTA Y OPCIONES A ELEGIR


import SwiftUI

struct IndividualQuizActivity: View {
    
    let preguntasArr: PreguntasPalabrasVideosArr
    @Binding var correctAnswers: Int
    @Binding var questionCorrectAnswers: [Int]
    @Binding var currentQuestionIndex: Int
    @State var correctAnswerVideo: Bool = false
    @State var bindingTapped: Bool = false
    
    @Environment(\.horizontalSizeClass) var horizontalSizeClass

    var body: some View {
        
        
        var imageWidth: CGFloat {
            return horizontalSizeClass == .compact ? 45 : 100
        }
        var imageHeight: CGFloat {
            return horizontalSizeClass == .compact ? 60 : 120
        }

        var objectFontSize: CGFloat {
            return horizontalSizeClass == .compact ? 35 : 50
        }
        
        var objectRowSize: CGFloat {
            return horizontalSizeClass == .compact ? 90 : 155
        }
        
        var objectSeparation: CGFloat {
            return horizontalSizeClass == .compact ? 2 : 20
        }
        
        var objectSeparation2: CGFloat {
            return horizontalSizeClass == .compact ? 10 : 0
        }
        
        NavigationStack(){
            VStack (alignment: .center, spacing: objectSeparation) {
                Spacer(minLength: 15)
                
                let randomNumber = Int.random(in: 0...1)
                
                if (currentQuestionIndex < preguntasArr.preguntas.count) {
                    if randomNumber == 0 {
                        VideoView(videoID: preguntasArr.preguntas[currentQuestionIndex].id_video)
                            .aspectRatio(4/5, contentMode: .fit) // Adjust contentMode to .fit or .fill depending on your need
                            .frame(width: UIScreen.main.bounds.width - 48) // Adjusting for padding
                            .cornerRadius(12)
                            .padding(.horizontal, 24)
                    }
                    
                    if randomNumber == 1 {
                        HStack (alignment: .center, spacing: 10) {
                            Text(preguntasArr.preguntas[currentQuestionIndex].pregunta)
                                .font(.system(size: objectFontSize + 8,weight: .bold))
                                .foregroundStyle(Color.white)
                            
                            if let imageUrl = URL(string: preguntasArr.preguntas[currentQuestionIndex].url_icono),
                               let imageData = try? Data(contentsOf: imageUrl),
                               let uiImage = UIImage(data: imageData) {
                                Image(uiImage: uiImage)
                                    .resizable()
                                    .aspectRatio(contentMode: .fit)
                                    .frame(width: imageWidth, height: imageHeight)
                                
                            }
                        }
                    }
                    
                    if randomNumber == 0 {
                        let pregunta = preguntasArr.preguntas[currentQuestionIndex]
                        GeometryReader { geometry in
                            List(preguntasArr.preguntas.indices, id: \.self) { index in
                                if index == currentQuestionIndex {
                                    let pregunta = preguntasArr.preguntas[currentQuestionIndex]
                                    ForEach(pregunta.respuestas.indices, id: \.self) { answerIndex in
                                        let respuesta = pregunta.respuestas[answerIndex]
                                        HStack (alignment: .center, spacing: 10){
                                            QuizButton(
                                                randomNum: randomNumber,
                                                text: respuesta.respuesta_palabra,
                                                url_icono: respuesta.respuesta_icono,
                                                video_id: respuesta.respuesta_video,
                                                esCorrecta: respuesta.esCorrecta,
                                                numeroArr: preguntasArr.preguntas.count,
                                                preguntasArr: preguntasArr,
                                                correctAnswers: $correctAnswers,
                                                questionCorrectAnswers: $questionCorrectAnswers,
                                                currentQuestionIndex: $currentQuestionIndex,
                                                cantidadCorrectas: pregunta.cantidadCorrectas,
                                                correctAnswerVideo: $correctAnswerVideo,
                                                bindingTapped: $bindingTapped
                                            )
                                            .frame(height: objectRowSize)
                                            .background(getBackgroundColor(for: answerIndex))
                                            
                                        }
                                        .clipShape(RoundedRectangle(cornerRadius: 15))
                                    }
                                    .listRowBackground(Color.clear)
                                }
                            }.listStyle(PlainListStyle())
                                .frame(width: geometry.size.width, height: geometry.size.height + 20)
                        }
                    }
                    
                    if randomNumber == 1 {
                        let pregunta = preguntasArr.preguntas[currentQuestionIndex]
                        //Text(pregunta.pregunta)
                        //    .font(.system(size: 35))
                        
                        var objectRowHeight: CGFloat {
                            return horizontalSizeClass == .compact ? 110 : 200
                        }
                        
                        List(preguntasArr.preguntas.indices, id: \.self) { index in
                            if index == currentQuestionIndex {
                                let pregunta = preguntasArr.preguntas[currentQuestionIndex]
                                ForEach(pregunta.respuestas.indices, id: \.self) { answerIndex in
                                    let respuesta = pregunta.respuestas[answerIndex]
                                    HStack (alignment: .center, spacing: 10){
                                        QuizButton(
                                            randomNum: randomNumber,
                                            text: respuesta.respuesta_palabra,
                                            url_icono: respuesta.respuesta_icono,
                                            video_id: respuesta.respuesta_video,
                                            esCorrecta: respuesta.esCorrecta,
                                            numeroArr: preguntasArr.preguntas.count,
                                            preguntasArr: preguntasArr,
                                            correctAnswers: $correctAnswers,
                                            questionCorrectAnswers: $questionCorrectAnswers,
                                            currentQuestionIndex: $currentQuestionIndex,
                                            cantidadCorrectas: pregunta.cantidadCorrectas,
                                            correctAnswerVideo: $correctAnswerVideo,
                                            bindingTapped: $bindingTapped
                                        )
                                        .frame(height: objectRowHeight + 10)
                                        .padding(.all, 10)
                                        .background(getBackgroundColor(for: answerIndex))
                                    }
                                    .clipShape(RoundedRectangle(cornerRadius: 15))
                                    .padding(.all, 10)
                                }
                                .listRowBackground(Color.clear)
                            }
                        }.listStyle(PlainListStyle())
                            
                          //  .frame(width: 100, height: 100)
                    }
                }
            }
            .background(Image("Wallpaper") // Replace "wallpaper" with the name of your asset
                .resizable()
                .aspectRatio(contentMode: .fill))
        }
    }
}

struct QuizButton: View {
    @State private var didTap: Bool = false
    @State private var isCorrectAnswerSelected: Bool = false
    let randomNum: Int
    let text: String
    let url_icono: String
    let video_id: String
    let esCorrecta: Bool
    let numeroArr: Int
    let preguntasArr: PreguntasPalabrasVideosArr
    @Binding var correctAnswers: Int
    @Binding var questionCorrectAnswers: [Int]
    @Binding var currentQuestionIndex: Int
    var cantidadCorrectas: Int
    @Binding var correctAnswerVideo: Bool
    @Binding var bindingTapped: Bool
    
    @Environment(\.horizontalSizeClass) var horizontalSizeClass


    var body: some View {
        
        
        var imageWidth: CGFloat {
            return horizontalSizeClass == .compact ? 45 : 100
        }
        var imageHeight: CGFloat {
            return horizontalSizeClass == .compact ? 60 : 120
        }

        var objectFontSize: CGFloat {
            return horizontalSizeClass == .compact ? 35 : 50
        }
        
        var objectFontSize2: CGFloat {
            return horizontalSizeClass == .compact ? 45 : 50
        }
        
        var objectSeparation: CGFloat {
            return horizontalSizeClass == .compact ? 10 : 25
        }
        
        var objectHeight: CGFloat {
            return horizontalSizeClass == .compact ? 10 : 25
        }
        
        var objectSpaceWidth: CGFloat {
            return horizontalSizeClass == .compact ? 100 : 120
        }
        
        var videoWidth: CGFloat {
            return horizontalSizeClass == .compact ? 0.8 : 0.62
        }
        
        Button(action: {
            self.didTap = true
            bindingTapped = true
            if esCorrecta {
                isCorrectAnswerSelected = true
                correctAnswerVideo = true
                correctAnswers += 1
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.75) {
                    questionCorrectAnswers[currentQuestionIndex] += 1
                    if currentQuestionIndex < preguntasArr.preguntas.count {
                        currentQuestionIndex += 1
                    }
                    isCorrectAnswerSelected = true
                }
            }
        }) {
            if randomNum == 0 {
                HStack(alignment: .center, spacing: objectSeparation){
                    Spacer(minLength: 50)
                    Text(text)
                        //.frame(maxWidth: .fit)
                        .font(.system(size: objectFontSize - 10))
                        .foregroundColor(
                            !didTap ? Color.white :
                                (didTap && isCorrectAnswerSelected) ? Color.green :
                                (didTap && !isCorrectAnswerSelected) ? Color.red :
                                Color.white
                        )
                    
                    if let imageUrl = URL(string: url_icono),
                       let imageData = try? Data(contentsOf: imageUrl),
                       let uiImage = UIImage(data: imageData) {
                        Image(uiImage: uiImage)
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: imageWidth, height: imageHeight)
                        
                        
                    }
                    Spacer(minLength: 50)
                }.frame(maxWidth: .infinity)

            }
            if randomNum == 1 {
                    HStack (alignment: .center) {
                        if horizontalSizeClass != .compact {
                            Spacer(minLength: objectSpaceWidth - 20)

                            GeometryReader { geometry in
                                VideoView(videoID: video_id)
                                    .frame(maxWidth: geometry.size.width * videoWidth) // Adjust the width as needed
                                    .cornerRadius(12)
                                    .padding(.vertical, 10)
                            }
                            .frame(height: UIScreen.main.bounds.height * 0.25)
                            
                            // .frame(maxWidth: 350, minHeight: 0, maxHeight: UIScreen.main.bounds.height)
                            .cornerRadius(12)
                        }else{
                            VideoView(videoID: video_id)
                                .frame(minHeight: 0, maxHeight: UIScreen.main.bounds.height * 0.7)
                                .cornerRadius(12)
                                .padding(.vertical, 10)
                        }
                        
                        Text("Seleccionar")
                            .frame(maxHeight: UIScreen.main.bounds.height * 0.3)
                            .frame(maxWidth:117)
                            .font(.system(size: objectFontSize2 - 27))
                            .foregroundColor(
                                !didTap ? Color.white :
                                    (didTap && isCorrectAnswerSelected) ? Color.green :
                                    (didTap && !isCorrectAnswerSelected) ? Color.red :
                                    Color.white
                            )
                        if horizontalSizeClass != .compact {
                            Spacer(minLength: objectSpaceWidth  - 40)
                        }
                }
            }
        }
    }
}

func getBackgroundColor(for answerIndex: Int) -> Color {
    switch answerIndex {
    case 0:
        return Color.blue
    case 1:
        return Color.blue
    case 2:
        return Color.blue
    case 3:
        return Color.blue
    default:
        return Color.clear
    }
}
