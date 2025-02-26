// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, setDoc } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, doc, getDoc, getDocs, getCollection, orderBy} from "firebase/firestore";
// chatGPT - import AsyncStorage
// I was getting an error that said AsynStorage not defined, so I used ChatGPT to help me debug
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useState, useEffect } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCBW7mF4AuycWBn7yA8yLtn6C-0MYeIlr4",
    authDomain: "ecofriend-ad2cf.firebaseapp.com",
    projectId: "ecofriend-ad2cf",    
    storageBucket: "ecofriend-ad2cf.appspot.com",
    messagingSenderId: "633748864659",  
    appId: "1:633748864659:web:c794b7e02469d3306fd766",
    measurementId: "G-499Z6PTKEH"
};


if (getApps().length === 0) {
  // Initialize Firebase app
  const app = initializeApp(firebaseConfig);


  //Initialize Auth only if it hasn't been initialized before
  initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });

  const auth = getAuth();

  // Description: creates a user collection to store all the carbon, settings, article, etc. data
  // Link: https://chat.openai.com/share/71f0d274-cfc1-44c6-9841-5bf36e5cc3d4 
  onAuthStateChanged(auth, async (user) => {
    console.log("User")
    //console.log(user.toJSON.toString)
    if (user) {

      try {
        // Check if user exists in Firestore
        const db = getFirestore(app); // Get Firestore instance after initialization
        console.log("db")
        console.log(db.toJSON.toString)
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          // User doesn't exist, create user document
          await setDoc(userDocRef, { email: user.email });
          //await addCarbonArray(user.uid, []);
          console.log("User added to Firestore successfully");
        } else {

          console.log("User already exists in Firestore");
        }
        
        //fetchData();
      } catch (error) {
        console.error("***Error adding user to Firestore:", error);
      }
    } else {
      // No user is signed in.
      console.log("No user signed in");
    }
  });
}
// Now you can proceed to use Firebase normally
const app = getApp();
const auth = getAuth(app);
const db = getFirestore(app);
//const storage = getStorage(app);

const addCarbonArray= async (uid, cArray)=>{
  const userDocRef = doc(db, "users", uid);
  const carbonCollectionRef = collection(userDocRef, "carbons");
  await addDoc(carbonCollectionRef, {
    carbons: cArray, //These 3 lines are the actual data that we are storing
  });
}

// const fetchUserIds = async () => {
//   try {
//     const user = auth().currentUser;

//     if (user) {
//       console.log('User ID:', user.uid);
//       return user.uid;
//     } else {
//       console.log('No user logged in');
//       return null;
//     }
//   } catch (error) {
//     console.error('Error fetching user ID:', error);
//     throw error;
//   }
// };

// const[uuid,setUuid]=useState('');
// export const getUserId = async () => {
//   try {
//     const userId = await fetchUserIds();
//     setUuid(userId);
//     return userId;
//   } catch (error) {
//     console.error('Error exporting user ID:', error);
//     throw error;
//   }
// };


// const fetchData = async () => {
//   const tempArray = [];
//   try {
//     // const querySnapshot = await getDocs(collection(db, "carbons", uid));
//     console.log("Auth: " + auth)
//     const userDocRef = doc(db, "users", (auth.currentUser.uid));
//         console.log("angela");

//     const userDocSnap = await getDoc(userDocRef);
//     if (querySnapshot.exists()) {
//       // Document exists, you can access its data using .data()
//       const userData = userDocSnap.data();
//       console.log("User data:", "kuldeep");

//     // querySnapshot.forEach((doc) => {
//     //   console.log(doc);
//       // console.log("14214");

//       // const obj = doc.get("carbons");
//       // console.log(obj);
//       // tempArray.push(obj);
//       // console.log("monthhhh");
//       // console.log(tempArray);
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
//   return tempArray;
// };

const fetchData = async () => {
  const tempArray = [];
  //check to make sure that currentUser exists - make sure user is signed in
  if (!auth.currentUser) {
    console.log("No user signed in");
    return tempArray; // Return empty array or handle accordingly
  }
  try {
    // const querySnapshot = await getDocs(collection(db, "carbons", uid));
    console.log("Auth: " + auth)
    console.log(auth.currentUser)
    const userDocRef = doc(db, "users", (auth.currentUser.uid));
        console.log("userDocRef: " + userDocRef.toString());

    const userDocSnap = await getDoc(userDocRef);
    
    //console.log("Query snapshot" + querySnapshot)
    if (userDocSnap.exists()) {
      const subcollectionRef = collection(userDocRef, "carbons");
      const querySnapshot = await getDocs(subcollectionRef);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          // Access each document and push data to tempArray
          tempArray.push(doc.data());
        });
        console.log("Fetched data:", tempArray);
      } else {
        console.log("Subcollection is empty");
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return tempArray;
};

//fetchData();

// Call the fetchData function
//fetchData();


// Call the fetchData function
//fetchData();

// const querySnapshot = await getDocs(collection(db, "carbons"));
// querySnapshot.forEach((doc) => {
  
// //Do what you need to do with your data here
// // setTempArray([...tempArray, doc]);
// tempArray.push(doc);
// // setTempArray(doc);
// console.log("monthhhh");
// console.log(tempArray);
// //return tempArray;
// });





// const UserProfile = () => {
//   const fetchUserId = async () => {
//     const user = auth().currentUser;
//     if (user) {
//       const userId = user.uid;
//       console.log('User ID:', userId);
//     } else {
//       console.log('No user signed in');
//     }
//   };

  // useEffect(() => {
  //   fetchUserId();
  // }, []);

//   return (
//     <View>
//       <Text>User Profile</Text>
//       {/* Display user profile details here */}
//     </View>
//   );
// // };
// const [carbon, setCarbon]=useState([]);
// const getCarbonData= async () => {
//   const querySnapshot = await getDocs(collection(db, "carbons"));
//   querySnapshot.forEach((doc) => {
//     setCarbon([...carbon, doc]);
//   });
// };

// Check if there are no Firebase apps initialized


const addCarbonData = async (uid, carbonData) => {
  try {
    const db = getFirestore(app);
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userDocData = userDocSnap.data();
      let carbonArray = userDocData.carbonArray || []; // Get the existing carbonArray or initialize as empty array
      carbonArray.push(carbonData); // Add new carbonData to the array

      // Update the carbonArray in the user's document
      await setDoc(userDocRef, { carbonArray }, { merge: true });
      console.log("Carbon data added to Firestore successfully for user:", uid);
    } else {
      console.log("User document does not exist for user:", uid);
    }
  } catch (error) {
    console.error("***Error adding carbon data to Firestore:", error);
  }
};



// Export the necessary variables and functions
export { app, auth, db, signInWithEmailAndPassword, addCarbonArray, fetchData//carbon//getUserId, uuid, UserProfile, 
//querySnapshot, tempArray
};