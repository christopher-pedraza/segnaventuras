//
//  VideoActivityEnd.swift
//  Segnaventura
//
//  Created by Christopher Pedraza on 21/09/23.
//

import SwiftUI

struct VideoActivityEnd: View {
    @Binding var correctAnswers : Int
    let maxCorrectas : Int
    
    var body: some View {
        VStack {
            Text("\(correctAnswers)/\(maxCorrectas)")
            Button(action: {
                
            }) {
                Text("Terminar")
                    .font(.system(size: 24))
            }
            .disabled(correctAnswers != maxCorrectas)
        }
    }
}

/*
 struct VideoActivityEnd_Previews: PreviewProvider {
 static var previews: some View {
 VideoActivityEnd()
 }
 }
 */
