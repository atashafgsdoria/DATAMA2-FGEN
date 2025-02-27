<template>
  <div class="section">
    <h2>Properties to be Covered</h2>
    <p>Enter 0 if not applicable.</p>
    <div class="columns">
      <div class="column">
        <label for="building-improvements">Building Improvements:</label>
        <input v-model="properties.buildingImprovements" type="number" id="building-improvements" name="building-improvements" placeholder="Estimated Amount" pattern="\d+(\.\d{1,2})?" min="0"><br><br>

        <label for="household-contents">Household Contents:</label>
        <input v-model="properties.householdContents" type="number" id="household-contents" name="household-contents" placeholder="Estimated Amount" pattern="\d+(\.\d{1,2})?" min="0"><br><br>

        <label for="swimming-pool">Swimming Pool:</label>
        <input v-model="properties.swimmingPool" type="number" id="swimming-pool" name="swimming-pool" placeholder="Estimated Amount" pattern="\d+(\.\d{1,2})?" min="0"><br><br>

        <label for="gazebo">Gazebo:</label>
        <input v-model="properties.gazebo" type="number" id="gazebo" name="gazebo" placeholder="Estimated Amount" pattern="\d+(\.\d{1,2})?" min="0"><br><br>
      </div>
      <div class="column">
        <label for="water-tank">Water Tank:</label>
        <input v-model="properties.waterTank" type="number" id="water-tank" name="water-tank" placeholder="Estimated Amount" pattern="\d+(\.\d{1,2})?" min="0"><br><br>

        <label for="pump-house">Pump House:</label>
        <input v-model="properties.pumpHouse" type="number" id="pump-house" name="pump-house" placeholder="Estimated Amount" pattern="\d+(\.\d{1,2})?" min="0"><br><br>

        <label for="dirty-kitchen">Dirty Kitchen:</label>
        <input v-model="properties.dirtyKitchen" type="number" id="dirty-kitchen" name="dirty-kitchen" placeholder="Estimated Amount" pattern="\d+(\.\d{1,2})?" min="0"><br><br>

        <label for="concrete-fence">Concrete Fence:</label>
        <input v-model="properties.concreteFence" type="number" id="concrete-fence" name="concrete-fence" placeholder="Estimated Amount" pattern="\d+(\.\d{1,2})?" min="0"><br><br>
      </div>
    </div>
        <button @click="submitPropertiesToBeCovered">Proceed</button>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js';


export default {
  data() {
    return {
      properties: {
        buildingImprovements: null,
        householdContents: null,
        swimmingPool: null,
        gazebo: null,
        waterTank: null,
        pumpHouse: null,
        dirtyKitchen: null,
        concreteFence: null
      } // ✅ No trailing comma here
    };
  },
  methods: {
    async submitPropertiesToBeCovered() {
      try {
        const propertyData = this.$store.state.property;
        if (!propertyData || !propertyData.propertydescription_id) { 
          alert("Property description not found. Please fill out the previous form first.");
          return;
        }

        const propertiesToBeCoveredData = {
          ...this.properties,
          propertydescription_id: propertyData.propertydescription_id
        };

        const { data, error } = await supabase
          .from('PropertiesToBeCovered')
          .insert([propertiesToBeCoveredData])
          .select();

        if (error) {
          console.error('Error inserting properties:', error);
          alert('Error submitting form.');
          return;
        }

        console.log('Data inserted:', data);
        if (data && data.length > 0) {
          this.$store.dispatch('saveProperty', { propertiestobecovered_id: data[0].propertiestobecovered_id });
        }

        this.properties = {
          buildingImprovements: null,
          householdContents: null,
          swimmingPool: null,
          gazebo: null,
          waterTank: null,
          pumpHouse: null,
          dirtyKitchen: null,
          concreteFence: null
        };

        this.$router.push('/offered-packages'); // ✅ Ensure correct routing

      } catch (error) {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  } // ✅ Ensure the closing bracket is correct
}; // ✅ Make sure there's no extra comma or unexpected semicolon here
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
  margin-bottom: 5px;
}

input[type="number"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
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