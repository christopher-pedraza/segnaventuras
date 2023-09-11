//
//  ContentView.swift
//  Segnaventura
//
//  Created by Alumno on 05/09/23.
//

import SwiftUI

struct ContentView: View {
    @EnvironmentObject var VocabularioVM : VocabularioViewModel
    @EnvironmentObject var fsm : FileSystemManager
    
    @State var palabra_add : String = ""
    @State var palabra_rem : String = ""
    
    var body: some View {
        VStack {
            TextField("Palabra a agregar: ", text: $palabra_add)
                .border(.secondary)
                .onSubmit {
                    do {
                        try fsm.agregarPalabra(palabra: palabra_add)
                    } catch {}
                }
            
            TextField("Palabra a quitar: ", text: $palabra_rem)
                .border(.secondary)
                .onSubmit {
                    do {
                        try fsm.quitarPalabra(palabra: palabra_rem)
                    } catch {}
                }
            
            Text("PALABRAS: ")
            
            List(fsm.vocabularioAprendido, id: \.self) { item in
                Text(item)
            }
            .task {
                do {
                    fsm.vocabularioAprendido = try fsm.load()
                } catch {}
            }
        }
        
        /*
        List(VocabularioVM.vocabulario.categorias) { categoria in
            VStack {
                Text(categoria.nombre_categoria)
                
                ForEach(categoria.vocabulario) { vocabulario in
                    VStack {
                        Text(vocabulario.palabra_espagnol)
                        Text(vocabulario.url_video)
                    }
                }
            }
        }
        .task {
            do {
                try fsm.save(strings: ["Test", "Test2"])
                try await VocabularioVM.getVocabularioData()
            } catch {
                print("Error: No se pudo obtener los datos de las fotos.")
            }
        }
        List(fsm.vocabularioAprendido, id: \.self) { item in
            Text(item)
        }
        .task {
            do {
                fsm.vocabularioAprendido = try fsm.load()
            } catch {}
        }
        
        Text("Test")
         */
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
