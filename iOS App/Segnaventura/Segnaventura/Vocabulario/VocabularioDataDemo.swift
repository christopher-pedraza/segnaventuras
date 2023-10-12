import SwiftUI
import AVKit
import AVFoundation


   struct VocabularioDataDemo: View {
       @EnvironmentObject var VocabularioVM: VocabularioViewModel
       @EnvironmentObject var fsm: FileSystemManager
       @State private var selectedVocabulary: Vocabulario?
       

       let customColor = UIColor(Color(red: 72 / 255, green: 200 / 255, blue: 254 / 255)) // Replace with your RGB values
       
       let customColorBackground = Color(red: 205 / 255, green: 241 / 255, blue: 255 / 255) // Replace with your RGB values
       


       //Para editar la navbar de la parte superior de la pantalla
       init() {
           
           /*
           let customColorNavBar = UIColor(Color(red: 21 / 255, green: 17 / 255, blue: 28 / 255))
           let navBarAppearance = UINavigationBarAppearance()
           ///navBarAppearance.configureWithOpaqueBackground()
           navBarAppearance.backgroundColor = customColorNavBar
           navBarAppearance.titleTextAttributes = [.foregroundColor: UIColor.white]
           // Set the appearance for compact navigation bars (when scrolling)
           //navBarAppearance.compactAppearance = navBarAppearance
           */
           
           let customColorNavBar = UIColor(Color(red: 21 / 255, green: 17 / 255, blue: 28 / 255))
                   let navBarAppearance = UINavigationBarAppearance()
                   navBarAppearance.backgroundColor = customColorNavBar
                   
                   // Customize the font for the navigation bar title text
                   let titleFont = UIFont(name: "Poppins-SemiBold", size: 24)!
                   navBarAppearance.titleTextAttributes = [.foregroundColor: UIColor.white, .font: titleFont]
                   
                   // Set backgroundEffect to nil to remove the white space
                   navBarAppearance.backgroundEffect = nil
                   
                   UINavigationBar.appearance().standardAppearance = navBarAppearance
                   UINavigationBar.appearance().compactAppearance = navBarAppearance
                   UINavigationBar.appearance().scrollEdgeAppearance = navBarAppearance
               
               // Set the appearance for full-height navigation bars (when not scrolling)
          // navBarAppearance.scrollEdgeAppearance = navBarAppearance
       }

       var body: some View {
               NavigationStack {
                   
                   VStack {
                       
                       List(VocabularioVM.vocabulario.categorias) { categoria in
                           CategoryView(category: categoria)
                               .listRowBackground(customColorBackground)
                       }

                       .task {
                           do {
                               try await VocabularioVM.getVocabularioData()
                           } catch {
                               print("Error: Couldn't fetch data from the API")
                           }
                       }
                       .listStyle(PlainListStyle()) // Remove list style to take full width
                   }

                   .frame(maxWidth: .infinity, alignment: .leading) // Make VStack take full width
                   .background(customColorBackground)
                   .navigationTitle("Vocabulario")
                   .navigationBarTitleDisplayMode(.inline)
                   
                   .sheet(item: $selectedVocabulary) { vocabulary in
                       PopupView(vocabulary: vocabulary, videoID: vocabulary.id_video_segna)
                   }
               }
           
           
           .navigationViewStyle(StackNavigationViewStyle())
           
       }
   }
   

   struct VocabularioDataDemo_Previews: PreviewProvider {
       static var previews: some View {
           VocabularioDataDemo()
       }
   }

//Vista de la categoria de objetos
       struct CategoryView: View {
           let customColorVerMas = Color(red: 12 / 255, green: 153 / 255, blue: 255 / 255)
           let category: Categorias
           @State private var showAllObjects = false //Variable que controla si
           @State private var selectedVocabulary: Vocabulario? //Variable para definir vocabulario que selecciono el usuario
           @Environment(\.horizontalSizeClass) var horizontalSizeClass

           var imageWidth: CGFloat {
               return horizontalSizeClass == .compact ? 45 : 100
           }
           var imageHeight: CGFloat {
               return horizontalSizeClass == .compact ? 60 : 120
           }

           var objectFontSize: CGFloat {
               return horizontalSizeClass == .compact ? 20 : 35
           }
           
           let customColor = Color(red: 72 / 255, green: 200 / 255, blue: 254 / 255)
           
           
           let customColorObjeto = Color(red: 228 / 255, green: 228 / 255, blue: 228 / 255)
           
           

           var body: some View {
               ZStack{
                   //Color.black
                   VStack {
                       Text(category.nombre)
                           .font(Font.custom("Poppins-SemiBold", size: 35))
                       /*.font(.custom(
                        "Poppins-SemiBold",
                        size: horizontalSizeClass == .compact ? 25 : 40).bold())*/
                       //  .font(.title)
                           .padding(.top,5)
                           .foregroundColor(.black)
                           .frame(maxWidth: .infinity, alignment: .leading)
                       
                       //Limita objetos en una categoria a 6, checa si esta inclinado para definir numero de filas y  columnas
                       let maxObjectsPerRow = isLandscape ? 2 : 3
                       let objectsToDisplay = showAllObjects ? category.palabra.count : min(category.palabra.count,4)
                       
                       LazyVGrid(columns: columns(), spacing: 0) {
                           ForEach(category.palabra.prefix(objectsToDisplay).indices, id: \.self) { index in
                               let vocabulario = category.palabra[index]
                               
                               VStack (spacing:10) {
                                   // Check if url_icono is empty, and use a fallback image if true
                                   if vocabulario.url_icono.isEmpty {
                                       Image("imagenObjetoVacio")
                                           .resizable()
                                           .aspectRatio(contentMode: .fit)
                                           .frame(width: imageWidth, height: imageWidth)
                                           .background(Color.white)
                                           .cornerRadius(15)
                                   } else {
                                       if let imageUrl = URL(string: vocabulario.url_icono),
                                          let imageData = try? Data(contentsOf: imageUrl),
                                          let uiImage = UIImage(data: imageData) {
                                           Image(uiImage: uiImage)
                                               .resizable()
                                               .aspectRatio(contentMode: .fit)
                                               .frame(width: imageWidth, height: imageWidth)
                                               .padding(.top,20)
                                               .onTapGesture {
                                                   selectedVocabulary = vocabulario // Set the selected vocabulary
                                               }
                                       }
                                   }
                                   
                                   Text(vocabulario.palabra)
                                       .font(Font.custom("Poppins-Regular", size: objectFontSize)) // Adjust font size here
                                       .font(.headline)
                                   
                                       .foregroundColor(.black)
                                       .frame(width: 100)
                                       .padding(.horizontal,10)
                                       .padding(.vertical,10)
                                       
                               }
                               .background(customColorObjeto)
                               
                               .contentShape(Rectangle()) // Make the whole cell tappable
                               .cornerRadius(15)
                               .padding(.horizontal,50)
                               .padding(.vertical,13)
                               .onTapGesture {
                                   selectedVocabulary = vocabulario // Set the selected vocabulary when the cell is tapped
                               }
                           }
                       }
                       if category.palabra.count > 4 {
                           Button(action: {
                               showAllObjects.toggle()
                           }) {
                               Text(showAllObjects ? "Cerrar" : "Ver más")
                                   .foregroundColor(customColorVerMas)
                                   .font(.system(size: horizontalSizeClass == .compact ? 18 : 30))
                           }
                           .padding(.top, 5)
                           .padding(.bottom, 3)
                           .padding(.horizontal, 7)
                           .background(
                               RoundedRectangle(cornerRadius: 4) // Apply round corners to the button
                                   .stroke(customColorVerMas, lineWidth: 1) // Set a blue outline with a line width of 2
                                .padding(.bottom,7)
                           )
                       }
                   }
                   .padding(.horizontal,10)
                   .background(Color.white)
                   .cornerRadius(10)
                   
                   .sheet(item: $selectedVocabulary) { vocabulary in
                       PopupView(vocabulary: vocabulary, videoID: vocabulary.id_video_segna)
                   }
               }                            //.padding(.horizontal,35)
                  .padding(.horizontal,10)

           
           
       }
           

       func columns() -> [GridItem] {
           let columnsCount = isLandscape ? 3 : 2
           return Array(repeating: GridItem(.flexible(), spacing: 8), count: columnsCount)
       }

       var isLandscape: Bool {
           return UIDevice.current.orientation.isLandscape
       }
       }


//Vista del popup cuando usuario selecciona objeto
struct PopupView: View {
   let vocabulary: Vocabulario
   let videoID: String // Provide the video ID here
   @Environment(\.horizontalSizeClass) var horizontalSizeClass
   @Environment(\.presentationMode) var presentationMode
   let synthesizer = AVSpeechSynthesizer()
    
   var body: some View {
       VStack {
   
           HStack {
               Spacer()
               Button(action: {
                   // Close the popup when the close button is clicked
                   presentationMode.wrappedValue.dismiss()
               }) {
                   Image(systemName: "xmark.circle.fill")
                       .font(.title)
                       .foregroundColor(.gray)
                       .padding()
               }
           }
           HStack {
                           Text(vocabulary.palabra)
                               .font(.title)
                               .font(.system(size: horizontalSizeClass == .compact ? 25 : 80))
                           
                           Button(action: {
                               // Pronounce the word in Spanish
                               let utterance = AVSpeechUtterance(string: vocabulary.palabra)
                               utterance.voice = AVSpeechSynthesisVoice(language: "es-ES") // Spanish voice
                               synthesizer.speak(utterance)
                           }) {
                               Image(systemName: "speaker.2.fill")
                                   .font(.title)
                                   .foregroundColor(.black)
                           }
                       }

           // Embed the YouTube video using VideoView
           VideoView(videoID: videoID)
               .frame(width: horizontalSizeClass == .compact ? 300 : 550, height: horizontalSizeClass == .compact ? 220 : 400) // Adjust size based on size class
               .cornerRadius(30)

           if let imageUrl = URL(string: vocabulary.url_icono),
              let imageData = try? Data(contentsOf: imageUrl),
              let uiImage = UIImage(data: imageData) {
               Image(uiImage: uiImage)
                   .resizable()
                   .aspectRatio(contentMode: .fit)
                   .frame(width: horizontalSizeClass == .compact ? 300 : 550, height: horizontalSizeClass == .compact ? 220 : 400) // Adjust size based on size class
                   
                   .cornerRadius(30)
           }
           Spacer()
       }
   }
}
