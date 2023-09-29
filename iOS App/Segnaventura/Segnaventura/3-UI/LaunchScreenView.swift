//
//  LaunchScreenView.swift
//  coreML-starter
//
//
//

import SwiftUI

struct LaunchScreenView: View {
    
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
            ZStack {
                
                //[OPTIONAL] Edit background color here. You can also replace this with a background image.
                Color(hex: 0xD5F4FF, opacity: 1.0)
                    .ignoresSafeArea()
                
                VStack {
                    Text("Búsqueda del Tesoro")
                        .font(.system(size: 32, weight: .bold))
                        .foregroundColor(colorScheme == .dark ? Color("Background") : Color.black)
                    
                    // info
                    // TODO: Replace with description of your app
                    VStack(spacing: 20) {
                        Text("Posiciona un objeto que quieras identificar en la cámara de tu dispositivo")
                            .fixedSize(horizontal: false, vertical: true)
//                            .foregroundColor(colorScheme == .dark ? Color("Background") : Color.black)
                    }
                    .padding()
                    .multilineTextAlignment(.center)
                    
                    // item list
                    // TODO: replace with the names of your items
                    HStack(spacing: 10) {
                        
                        VStack {
                            Text("🍎")
                            Text("Manzana")
                        }
                        .padding()
                        
                        VStack {
                            Text("🍌")
                            Text("Banana")
                        }
                        .padding()
                        
                        VStack {
                            Text("🍓")
                            Text("Fresa")
                        }
                        .padding()
                    }
                    .background(Color(UIColor.secondarySystemBackground))
                    .cornerRadius(10)
//                    .padding()
                    
                    // start button
                    NavigationLink(destination: ClassificationView()){
                        Text("Escanear")
                    }
                    .buttonStyle(RoundedRectButtonStyle(buttonColor: .blue))
                    .padding()
                    
                }
                .padding()
                .frame(maxWidth: 370) // This sets the width of the white card
                .background(Color.white) // This sets the background color of the card
                .cornerRadius(25)
                .shadow(radius: 5)
                
            }// VStack
            .navigationBarHidden(true)
    }
}

struct LaunchScreenView_Previews: PreviewProvider {
    static var previews: some View {
        LaunchScreenView()
    }
}
