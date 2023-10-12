//
//  VocabularioModel.swift
//  Segnaventura
//
//  David Cavazos
//

import Foundation

// Modelo general que contiene una lista de las categorias del vocabulario
struct PalabrasVideosModel : Decodable, Equatable,Identifiable {
   var id = UUID()
   var palabra: String = ""
   var id_video_segna: String = ""
   
   //var categorias : [Categorias] = [Categorias]()
   
   enum CodingKeys : String, CodingKey {
       //case id
       case palabra
       case id_video_segna
       
       
       
   }
}
    /*
   static func !=(lhs: PalabrasVideosModel, rhs: PalabrasVideosModel) -> Bool {
           return lhs.palabra != rhs.palabra || lhs.id_video_segna != rhs.id_video_segna
       }
     */
    


   // Modelo general para la actividad de videos
   

   // Partes de cada actividad
struct PreguntasPalabrasVideosArr : Decodable, Identifiable, Hashable{
   var id = UUID()
   var preguntas : [PreguntaPalabrasVideos] = [PreguntaPalabrasVideos]()
   
   enum CodingKeys : String, CodingKey {
       case preguntas
   }
}

   // Preguntas
   struct PreguntaPalabrasVideos : Decodable, Identifiable, Hashable {
       var id = UUID()
       var pregunta : String = ""
       var id_video : String = ""
       var cantidadCorrectas = 0
       var esCorrecta = false
       var respuestas : [RespuestaPalabrasVideos] = [RespuestaPalabrasVideos]()
       
       enum CodingKeys : String, CodingKey {
           case pregunta
           case id_video
           case cantidadCorrectas
           case esCorrecta
           case respuestas
       }
   }




    // Respuestas
    struct RespuestaPalabrasVideos : Decodable, Identifiable, Hashable {
        var id = UUID()
        var respuesta_palabra : String = ""
        var respuesta_video : String = ""
        var esCorrecta : Bool = false
        
        enum CodingKeys : String, CodingKey {
            case respuesta_palabra
            case respuesta_video
            case esCorrecta
        }
    }

     
    


