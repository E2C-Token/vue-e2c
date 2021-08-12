import Vue from "vue";
import Vuex from "vuex";
import * as fb from "./firebase";
import router from "./router";

Vue.use(Vuex);

// realtime firebase

// All Tokens
fb.tokensE2CCollection.onSnapshot((snapshot) => {
  let tokensArray = [];

  snapshot.forEach((doc) => {
    let token = doc.data();
    token.id = doc.id;

    tokensArray.push(token);
  });

  store.commit("setTokens", tokensArray);
});

// Intentions Liquidation
fb.myIntentionList.onSnapshot((snapshot) => {
  let liquidationArray = [];

  snapshot.forEach((doc) => {
    let token = doc.data();
    token.id = doc.id;

    liquidationArray.push(token);
  });

  store.commit("setIntentionsLiquidation", liquidationArray);
});

fb.usersCollection.orderBy("name", "desc").onSnapshot((snapshot) => {
  let usersArray = [];

  snapshot.forEach((doc) => {
    let user = doc.data();
    user.id = doc.id;

    usersArray.push(user);
  });

  store.commit("setUsers", usersArray);
});

// My Tokens
fb.tokensE2CCollection
  .where("uid", "==", "9jMCoeFTDihB8eD4c9QpQIuHr5Z2")
  .onSnapshot((snapshot) => {
    let myTokensArray = [];

    snapshot.forEach((doc) => {
      let token = doc.data();
      token.id = doc.id;

      myTokensArray.push(token);
    });

    store.commit("setMyTokens", myTokensArray);
  });

fb.allWishes.onSnapshot((snapshot) => {
  let wishesArray = [];

  snapshot.forEach((doc) => {
    let wish = doc.data();
    wish.id = doc.id;

    wishesArray.push(wish);
  });

  store.commit("setAllWishes", wishesArray);
});
fb.avaiable.onSnapshot((snapshot) => {
  let avaiableArray = [];

  snapshot.forEach((doc) => {
    let avaiable = doc.data();
    avaiable.id = doc.id;

    avaiableArray.push(avaiable);
  });

  store.commit("setAvaiable", avaiableArray);
});

const store = new Vuex.Store({
  state: {
    userProfile: {},
    users: [],
    tokens: [],
    myTokens: [],
    allWishes: [],
    avaiable: [],
    intentionLiquidation: [],
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setPerformingRequest(state, val) {
      state.performingRequest = val;
    },
    setUsers(state, val) {
      state.users = val;
    },
    setTokens(state, val) {
      state.tokens = val;
    },
    setMyTokens(state, val) {
      state.myTokens = val;
    },
    setAllWishes(state, val) {
      state.allWishes = val;
    },
    setAvaiable(state, val) {
      state.avaiable = val;
    },
    setIntentionsLiquidation(state, val) {
      state.intentionLiquidation = val;
    }
  },
  actions: {
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );

      // create user object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        title: form.title,
        uid: user.uid,
      });

      // fetch user profile and set in state
      await dispatch("fetchUserProfile", user);
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      // set user profile in state
      commit("setUserProfile", userProfile.data());

      // change route to dashboard
      if (router.currentRoute.path === "/login") {
        router.push("/painel");
      }
    },
    async logout({ commit }) {
      // log user out
      await fb.auth.signOut();

      // clear user data from state
      commit("setUserProfile", {});

      // redirect to login view
      router.push("/login");
    },
    async emmitTokens({ state, commit }, payload) {
      await fb.tokensE2CCollection.add({
        createdAt: new Date(),
        initialAmount: payload.amount,
        amount: payload.amount,
        fromUid: fb.auth.currentUser.uid,
        fromName: state.userProfile.name,
        uid: payload.toUid,
        name: payload.toName,
        description: payload.description        
      });
      alert("Salvo com sucesso");
    },
    async setLiquidateIntentionDb({ state, commit }, payload) {
      await fb.intentionLiquidation.add({
        createdAt: new Date(),
        fromUid: fb.auth.currentUser.uid,
        emissionId: payload.emissionId,
        fromName: state.userProfile.name,
        name: payload.toName,
        uid: payload.toUid,
        description: payload.description,
        completed: false
      });
      alert("Um aviso de Intenção de Liquidação será enviado!");
    },
    async liquidateTokens({ state, commit }, payload) {
      // update token amount
      const tokenDoc = payload.tokenId;
      const initialAmount = payload.initialAmount;
      let subtraction = initialAmount - payload.amount;        
        await fb.tokensE2CCollection.doc(tokenDoc).update({
          amount: subtraction,
        });
      
      alert("Liquidação concluída!");
    },
    async saveWishAccessDb({ state, commit }, payload) {
      await fb.allWishes.add({
        createdAt: new Date(),
        fromUid: fb.auth.currentUser.uid,
        fromName: state.userProfile.name,
        title: payload.title,
        description: payload.description,
        completed: false,
      });
      alert("Desejo de acesso registrado");
    },
    async saveAvaiableDb({ state, commit }, payload) {
      await fb.avaiable.add({
        createdAt: new Date(),
        fromUid: fb.auth.currentUser.uid,
        fromName: state.userProfile.name,
        title: payload.title,
        description: payload.description,
        active: true,
      });
      alert("Salvo com sucesso!");
    },  
    async fetchUsers({ commit }) {
      await fb.usersCollection.get();
      const users = await fb.usersCollection.get();
      // set users in state
      commit("setUsers", users.data());
    },
    async updateProfile({ dispatch }, user) {
      const userId = fb.auth.currentUser.uid;
      // update user object
      const userRef = await fb.usersCollection.doc(userId).update({
        name: user.name,
        title: user.title,
      });

      dispatch("fetchUserProfile", { uid: userId });
    },
  },
});

export default store;
