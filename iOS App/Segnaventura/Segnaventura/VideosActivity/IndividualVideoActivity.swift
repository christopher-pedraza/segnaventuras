// ESTE ARCHIVO ES EL QUE MODIFICA LA ACTIVIDAD DONDE SE MUESTRAN VÍDEOS CON HISTORIAS Y PREGUNTAS
// EL USUARIO DEBE DE ELEGIR LA OPCIÓN CORRECTA DE UNA PREGUNTA QUE SE HACE BASANDOSE EN EL CONTEXTO DEL VÍDEO

import SwiftUI

struct IndividualVideoActivity: View {
    let videoID: String
    let preguntas: [Pregunta]
    @Binding var correctAnswers: Int
    @State var questionCorrectAnswers: [Int]
    @Binding var totalCorrectAnswers: Int
    let parteString: String

    // Define grid layout
    let columns: [GridItem] = Array(repeating: .init(.flexible()), count: 2)

    func saveData() {}

    var body: some View {
        let customPurple = Color(red: 148 / 255, green: 0 / 255, blue: 122 / 255)

        VStack {
            Spacer(minLength: 10)
            Text(parteString)
                .foregroundStyle(Color.white)
                .font(.system(size: 31, weight: .bold))
            VideoView(videoID: videoID)
                .aspectRatio(16/9, contentMode: .fit) // Adjust contentMode to .fit or .fill depending on your need
                .frame(width: UIScreen.main.bounds.width - 48) // Adjusting for padding
                .cornerRadius(12)
                .padding(.horizontal, 24)


            // Replace the List with LazyVGrid
            ScrollView {
                // Inside your ScrollView
                GeometryReader { geometry in
                    let width = geometry.size.width / 2 - 15 // Adjust the 15 to increase/decrease spacing
                    let height = geometry.size.height / 5 // Adjust this to change the height of the buttons

                    LazyVGrid(columns: columns, spacing: 10) {
                        ForEach(Array(preguntas.enumerated()), id: \.offset) { questionIndex, pregunta in
                            Section(header:
                                        Text(pregunta.pregunta)
                                            .font(.system(size: 24, weight: .bold))
                                            .foregroundColor(.white)
                            ) {
                                ForEach(pregunta.respuestas.indices, id: \.self) { optionIndex in
                                    VideoQuizButton(
                                        text: pregunta.respuestas[optionIndex].respuesta,
                                        esCorrecta: pregunta.respuestas[optionIndex].es_correcta,
                                        questionIndex: questionIndex,
                                        optionIndex: optionIndex,
                                        cantidadCorrectas: pregunta.cantidadCorrectas.respuestas_video_cuestionario,
                                        correctAnswers: $correctAnswers,
                                        questionCorrectAnswers: $questionCorrectAnswers
                                    )
                                    .frame(width: width, height: height) // Set the frame here
                                    .cornerRadius(15) // Set corner radius to make it look more 'square-like'
                                }
                            }
                        }
                    }
                    .padding(.horizontal, 10)
                }
                .frame(height: UIScreen.main.bounds.height * 0.6) // Adjust this to change the overall height of the grid
                .padding([.bottom], 20)
            }
            .background(customPurple)
            .padding([.bottom], 40)
        }
        .background(Image("Wallpaper")
                        .resizable()
                        .aspectRatio(contentMode: .fill))
    }
}


struct VideoQuizButton: View {
    @State private var didTap: Bool = false
    let text: String
    let esCorrecta: Bool
    let questionIndex: Int
    let optionIndex: Int
    var cantidadCorrectas: Int
    @Binding var correctAnswers: Int
    @Binding var questionCorrectAnswers: [Int]
    
    let buttonColors = [Color.blue]
    //let buttonColors: [Color] = [Color.blue, Color.orange, Color.purple, Color.yellow] // Customize as needed
    
    var body: some View {
        Button(action: {
            self.didTap = true
            if esCorrecta {
                correctAnswers += 1
                questionCorrectAnswers[questionIndex] += 1
            }
        }) {
            Text(text)
                .font(.system(size: 24))
                .frame(maxWidth: .infinity) // This will center the text
                .multilineTextAlignment(.center) // In case the text is multiple lines
                .padding(.vertical, 12) // Adjust vertical padding to decrease the height of the buttons
                .background(didTap ? (esCorrecta ? Color.green : Color.red) : buttonColors[optionIndex % buttonColors.count])
                .foregroundColor(.white)
                .cornerRadius(15) // This will round the corners
                .overlay(
                    RoundedRectangle(cornerRadius: 15)
                        .stroke(Color.white, lineWidth: 2) // This adds a white border to the buttons
                )
        }
    }
}
