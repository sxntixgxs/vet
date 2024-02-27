        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
        import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
        // Importa Firestore
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
          apiKey: "AIzaSyA7QN_cp2Ou55RcgzoNJQEXW10ogjzUIYI",
          authDomain: "enzovet-b8838.firebaseapp.com",
          projectId: "enzovet-b8838",
          storageBucket: "enzovet-b8838.appspot.com",
          messagingSenderId: "981295256253",
          appId: "1:981295256253:web:b94b47afe6b292576c5dd4",
          measurementId: "G-B9LVNC7F31"
        };
      
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
let send = document.getElementById('send');
const searchSend = document.getElementById('searchSend');


//busqueda
searchSend.addEventListener('click',async()=>{
    const cc = document.getElementById('searchCC').value;
    const q = query(collection(db,"testCollection"),where("cc","==",cc));
    try{
        const querySnapshot = await getDocs(q);
                    if (querySnapshot.empty){
                console.log(`No hay registros con el CC ${cc}`);
            } else {
                querySnapshot.forEach((doc)=>{
                    console.log(doc.id, ' => ', doc.data());
                    let nombre = doc.data().name;
                    let nombreMascota = doc.data().namePet;
                    let cc = doc.data().cc
                    alert(`nombre ${nombre}; cc ${cc}; nombre de mascota ${nombreMascota}`);
                })
            }
    }
    catch(error){
        console.log('Error al obtener documentos: ', error)
    }
});

//envio
send.addEventListener('click',async()=>{
    const nombre = document.getElementById('name').value;
    const cc = document.getElementById('cc').value;
    const namePet = document.getElementById('namePet').value;
    console.log('nombre',nombre);
    console.log('cc',cc);
    console.log('namePet',namePet);
    try{
        const docRef = await addDoc(collection(db,'testCollection'),{
            "name":nombre,
            "cc":cc,
            "namePet":namePet
        });
        console.log("Documento escrito con ID:",docRef.id);
    } catch (error){
        console.error("Error añadiendo documento: ",error);
    }
})