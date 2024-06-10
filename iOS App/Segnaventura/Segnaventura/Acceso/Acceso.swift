//
//  Login.swift
//  Segnaventura
//
//  Created by Alumno on 16/10/23.
//

import SwiftUI
import ActionButton
import TogglableSecureField

struct Acceso: View {
    @EnvironmentObject var AccesoVM : AccesoViewModel
    
    var body: some View {
        if AccesoVM.accesoValido {
            ContentView()
                .environmentObject(menuIndex())
        } else {
            TabView {
                Login()
                Register()
            }
            .tabViewStyle(.page(indexDisplayMode: .always))
            .indexViewStyle(.page(backgroundDisplayMode: .always))
        }
    }
}

class menuIndex : ObservableObject {
    @Published var index: Int = 1
}

enum FocusableField: Hashable {
    case user, password
}

struct Login: View {
    @EnvironmentObject var AccesoVM : AccesoViewModel
    @State private var isPerformingTask = false
    @FocusState private var focus: FocusableField?
    let device = UIDevice.current.userInterfaceIdiom
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        GeometryReader { geo in
            ZStack {
                Image("Wallpaper_azul")
                    .centerCropped()
                Circle()
                    .scale(device == .pad ? 1.3 : 1.7)
                    .foregroundColor(.white.opacity(0.15))
                    .frame(width: geo.size.width, height: geo.size.height)
                    .clipped()
                Circle()
                    .scale(device == .pad ? 1.1 : 1.5)
                    .foregroundColor(.white.opacity(0.90))
                    .frame(width: geo.size.width, height: geo.size.height)
                    .clipped()
                VStack {
                    Text("Inicio de sesión")
                        .font(.largeTitle)
                        .bold()
                        .padding()
                        .foregroundColor(colorScheme == .dark ? Color("Background") : Color.black)
                    TextField("Usuario", text: $AccesoVM.user)
                        .padding()
                        .frame(width: 300, height: 50)
                        .foregroundColor(colorScheme == .dark ? Color("Background") : Color.black)
                        .background(Color.purple.opacity(0.8))
                        .cornerRadius(10)
                        .autocorrectionDisabled()
                        .textInputAutocapitalization(.never)
                        .submitLabel(.next)
                        .focused($focus, equals: .user)
                        .onSubmit {
                            focus = .password
                        }
                    TogglableSecureField("Contraseña",
                                         secureContent: $AccesoVM.password,
                                         onCommit: {
                        guard !AccesoVM.password.isEmpty else { return }
                    })
                    .padding()
                    .frame(width: 300, height: 50)
                    .foregroundColor(colorScheme == .dark ? Color("Background") : Color.black)
                    .background(Color.purple.opacity(0.8))
                    .cornerRadius(10)
                    .focused($focus, equals: .password)
                    .submitLabel(.go)
                    .onSubmit {
                        Task {
                            await autenticarUsuario()
                        }
                    }
                    ActionButton(state: $AccesoVM.buttonState, onTap: {
                        Task {
                            await autenticarUsuario()
                        }
                    }, backgroundColor: .blue)
                    .frame(width: 300, height: 50)
                    
                    // Mensaje para deslizar hacia la derecha
                    Text("Para registro, desliza a la derecha")
                        .font(.footnote)
                        .bold()
                        .foregroundColor(.gray)
                }
            }
        }
    }

    func autenticarUsuario() async {
        do {
            try await AccesoVM.validarAcceso()
        } catch {
        }
    }
}

struct Register: View {
    @EnvironmentObject var AccesoVM : AccesoViewModel
    @State private var isPerformingTask = false
    @FocusState private var focus: FocusableField?
    let device = UIDevice.current.userInterfaceIdiom
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        GeometryReader { geo in
            ZStack {
                Image("Wallpaper_azul_claro")
                    .centerCropped()
                Circle()
                    .scale(device == .pad ? 1.3 : 1.7)
                    .foregroundColor(.white.opacity(0.15))
                    .frame(width: geo.size.width, height: geo.size.height)
                    .clipped()
                Circle()
                    .scale(device == .pad ? 1.1 : 1.5)
                    .foregroundColor(.white.opacity(0.90))
                    .frame(width: geo.size.width, height: geo.size.height)
                    .clipped()
                VStack {
                    Text("Registro")
                        .font(.largeTitle)
                        .bold()
                        .padding()
                        .foregroundColor(colorScheme == .dark ? Color("Background") : Color.black)
                    TextField("Usuario", text: $AccesoVM.user)
                        .padding()
                        .frame(width: 300, height: 50)
                        .background(Color.purple.opacity(0.8))
                        .foregroundColor(colorScheme == .dark ? Color("Background") : Color.black)
                        .cornerRadius(10)
                        .autocorrectionDisabled()
                        .textInputAutocapitalization(.never)
                        .submitLabel(.next)
                        .focused($focus, equals: .user)
                        .onSubmit {
                            focus = .password
                        }
                    TogglableSecureField("Contraseña",
                                         secureContent: $AccesoVM.password,
                                         onCommit: {
                        guard !AccesoVM.password.isEmpty else { return }
                    })
                    .padding()
                    .frame(width: 300, height: 50)
                    .background(Color.purple.opacity(0.8))
                    .foregroundColor(colorScheme == .dark ? Color("Background") : Color.black)
                    .cornerRadius(10)
                    .focused($focus, equals: .password)
                    .submitLabel(.go)
                    .onSubmit {
                        Task {
                            Login()
                        }
                    }
                    ActionButton(state: $AccesoVM.buttonState, onTap: {
                        Task {
                            Login()
                        }
                    }, backgroundColor: .blue)
                    .frame(width: 300, height: 50)
                }
            }
        }
    }
    
    func autenticarUsuario() async {
        do {
            try await AccesoVM.validarAcceso()
        } catch {
        }
    }
}
