//
//  IndividualVideoActivity.swift
//  Segnaventura
//
//  Created by Christopher Pedraza on 18/09/23.
//

import SwiftUI

struct IndividualVideoActivity: View {
    // @EnvironmentObject var VideoVM : VideoViewModel
    
    let videoID : String
    let preguntas : [Pregunta]
    
    func saveData() {
        
    }
    
    var body: some View {
        VStack {
            VideoView(videoID: videoID)
                .frame(minHeight: 0, maxHeight: UIScreen.main.bounds.height * 0.3)
                .cornerRadius(12)
                .padding(.horizontal, 24)
            
            Form {
                ForEach(preguntas, id: \.self) { pregunta in
                    Section(header: Text(pregunta.pregunta)) {
                        ForEach(pregunta.respuestas, id: \.self) { respuesta in
                            //Button(action: {}, label: {Text(respuesta.respuesta)})
                            VideoQuizButton(text: respuesta.respuesta, colorDefault: Color.black, colorPressed: respuesta.esCorrecta ? Color.green : Color.red)
                        }
                    }
                }
            }
            .padding([.bottom], 40)
        }
    }
}

struct IndividualVideoActivity_Previews: PreviewProvider {
    static var previews: some View {
        IndividualVideoActivity(videoID: "Y4Yv7sHJvMU", preguntas: [Pregunta]())
    }
}
