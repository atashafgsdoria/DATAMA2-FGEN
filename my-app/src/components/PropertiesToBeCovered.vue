<template>
  <div class="section">
    <h2>Properties to be Covered</h2>
    <p>Enter 0 if not applicable.</p>
    <div class="columns">
      <div class="column">
        <label for="building-improvements">Building Improvements:</label>
        <input v-model="properties.buildingImprovements" type="number" id="building-improvements" name="building-improvements" placeholder="Estimated Amount" min="0"><br><br>

        <label for="household-contents">Household Contents:</label>
        <input v-model="properties.householdContents" type="number" id="household-contents" name="household-contents" placeholder="Estimated Amount" min="0"><br><br>

        <label for="swimming-pool">Swimming Pool:</label>
        <input v-model="properties.swimmingPool" type="number" id="swimming-pool" name="swimming-pool" placeholder="Estimated Amount" min="0"><br><br>

        <label for="gazebo">Gazebo:</label>
        <input v-model="properties.gazebo" type="number" id="gazebo" name="gazebo" placeholder="Estimated Amount" min="0"><br><br>
      </div>
      <div class="column">
        <label for="water-tank">Water Tank:</label>
        <input v-model="properties.waterTank" type="number" id="water-tank" name="water-tank" placeholder="Estimated Amount" min="0"><br><br>

        <label for="pump-house">Pump House:</label>
        <input v-model="properties.pumpHouse" type="number" id="pump-house" name="pump-house" placeholder="Estimated Amount" min="0"><br><br>

        <label for="dirty-kitchen">Dirty Kitchen:</label>
        <input v-model="properties.dirtyKitchen" type="number" id="dirty-kitchen" name="dirty-kitchen" placeholder="Estimated Amount" min="0"><br><br>

        <label for="concrete-fence">Concrete Fence:</label>
        <input v-model="properties.concreteFence" type="number" id="concrete-fence" name="concrete-fence" placeholder="Estimated Amount" min="0"><br><br>
      </div>
    </div>
    <button @click="submitPropertiesToBeCovered">Proceed</button>
  </div>
</template>

<script>
import supabase from '@/supabase';

export default {
  data() {
    return {
      properties: {
        buildingImprovements: 0,
        householdContents: 0,
        swimmingPool: 0,
        gazebo: 0,
        waterTank: 0,
        pumpHouse: 0,
        dirtyKitchen: 0,
        concreteFence: 0
      }
    };
  },
  methods: {
    async submitPropertiesToBeCovered() {
      try {
        const propertyData = this.$store.state.property;
        if (!propertyData || !propertyData.propertyinformation_id) { 
          alert("Property information not found. Please fill out the previous form first.");
          return;
        }

        // Ensure at least one value is greater than 0
        const allZero = Object.values(this.properties).every(val => val === 0);
        if (allZero) {
          alert("Please enter at least one property improvement value.");
          return;
        }

        const propertiesToBeCoveredData = {
          ...this.properties,
          propertyinformation_id: propertyData.propertyinformation_id
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

        // Reset fields
        this.properties = {
          buildingImprovements: 0,
          householdContents: 0,
          swimmingPool: 0,
          gazebo: 0,
          waterTank: 0,
          pumpHouse: 0,
          dirtyKitchen: 0,
          concreteFence: 0
        };

        this.$router.push('/offered-packages');

      } catch (error) {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  }
};
</script>
