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
            return horizontalSizeClass == .compact ? 90 : 140
        }
        
        var objectSeparation: CGFloat {
            return horizontalSizeClass == .compact ? 10 : 20
        }
        
        NavigationStack{
            
            VStack {
                let randomNumber = Int.random(in: 0...1)
                
                if (currentQuestionIndex < preguntasArr.preguntas.count) {
                    if randomNumber == 0 {
                        VideoView(videoID: preguntasArr.preguntas[currentQuestionIndex].id_video)
                            .frame(minHeight: 0, maxHeight: UIScreen.main.bounds.height * 0.3)
                            .cornerRadius(12)
                            .padding(.horizontal, 24)
                    }
                    
                    if randomNumber == 1 {
                        HStack (alignment: .center, spacing: 10) {
                            Text(preguntasArr.preguntas[currentQuestionIndex].pregunta)
                                .font(.system(size: objectFontSize))
                            
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
                                .frame(width: geometry.size.width, height: geometry.size.height)
                        }
                    }
                    
                    if randomNumber == 1 {
                        let pregunta = preguntasArr.preguntas[currentQuestionIndex]
                        //Text(pregunta.pregunta)
                        //    .font(.system(size: 35))
                        
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
                                        .frame(height: 108)
                                        .padding(.all, 10)
                                        .background(getBackgroundColor(for: answerIndex))
                                    }
                                    .clipShape(RoundedRectangle(cornerRadius: 15))
                                }
                                .listRowBackground(Color.clear)
                            }
                        }.listStyle(PlainListStyle())
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
        
        var objectSeparation: CGFloat {
            return horizontalSizeClass == .compact ? 10 : 25
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
                HStack {
                    VideoView(videoID: video_id)
                        .frame(minHeight: 0, maxHeight: UIScreen.main.bounds.height)
                        .cornerRadius(12)
                    Text("Seleccionar")
                        .font(.system(size: objectFontSize - 15))
                        .foregroundColor(
                            !didTap ? Color.white :
                                (didTap && isCorrectAnswerSelected) ? Color.green :
                                (didTap && !isCorrectAnswerSelected) ? Color.red :
                                Color.white
                        )
                }
            }
        }
    }
}

func getBackgroundColor(for answerIndex: Int) -> Color {
    switch answerIndex {
    case 0:
        return Color.orange
    case 1:
        return Color.yellow
    case 2:
        return Color.red
    case 3:
        return Color.blue
    default:
        return Color.clear
    }
}
