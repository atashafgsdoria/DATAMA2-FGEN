<template>
  <div class="section">
    <h2>Client's Information</h2>
    <div class="columns">
      <div class="column">
        <label for="last_name">Last Name:</label>
        <input v-model="client.lastName" type="text" id="last_name" required />

        <label for="given_name">Given Name:</label>
        <input v-model="client.givenName" type="text" id="given_name" required />

        <label for="middle_name">Middle Name (Optional):</label>
        <input v-model="client.middleName" type="text" id="middle_name" />

        <label for="dob">Date of Birth</label>
        <input v-model="client.dob" type="date" id="dob" :max="legalAgeDate" required />

        <label>Client's Interest on Property:</label>
        <label><input v-model="client.interestOnProperty" type="radio" value="owner" required /> Owner</label>
        <label><input v-model="client.interestOnProperty" type="radio" value="lessee" /> Lessee</label>
        <label><input v-model="client.interestOnProperty" type="radio" value="mortgagee" /> Mortgagee</label>
      </div>

      <div class="column">
        <label for="phone_num">Mobile No.:</label>
        <input v-model="client.phoneNumber" type="tel" id="phone_num" pattern="[0-9]{11}" maxlength="11" required />

        <label for="email_add">Email Address:</label>
        <input v-model="client.email" type="email" id="email_add" required />

        <label for="mailing_address">Mailing Address:</label>
        <input v-model="client.mailingAddress" type="text" id="mailing_address" required />

        <label for="tel_num_res">Telephone No. (Residential):</label>
        <input v-model="client.residentialTelephone" type="tel" id="tel_num_res" pattern="[0-9]{10}" maxlength="10" />

        <label for="tel_num_off">Telephone No. (Office):</label>
        <input v-model="client.officeTelephone" type="tel" id="tel_num_off" pattern="[0-9]{10}" maxlength="10" />
      </div>
    </div>
    <button @click="submitForm">Proceed</button>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js';


export default {
  data() {
    return {
      client: {
        lastName: '',
        givenName: '',
        middleName: '',
        dob: '',
        interestOnProperty: '',
        phoneNumber: '',
        email: '',
        mailingAddress: '',
        residentialTelephone: '',
        officeTelephone: '',
      },
      legalAge: 18,
    };
  },
  computed: {
    legalAgeDate() {
      const today = new Date();
      return new Date(today.setFullYear(today.getFullYear() - this.legalAge)).toISOString().split('T')[0];
    },
  },
  methods: {
    ...mapActions(['saveClient']), // Vuex action to store client data

    async submitForm() {
      try {
        const { data, error } = await supabase.from('Clients').insert([this.client]).select();
        if (error) throw error;

        const savedClient = data[0];
        this.saveClient(savedClient); // Save client in Vuex store

        alert('Form submitted successfully!');
        this.$router.push('/property-information');
      } catch (error) {
        console.error('Error:', error);
        alert('Error submitting form: ' + error.message);
      }
    },
  },
};
</script>

<style scoped>
.section {
  padding: 20px;
}

.columns {
  display: flex;
  flex-wrap: wrap;
}

.column {
  flex: 1;
  padding: 10px;
  min-width: 300px;
}

label {
  display: block;
  margin-top: 10px;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
