<template>
  <div class="section">
    <h2>Property Description</h2>
    <p>Enter 0 if not applicable.</p>
    <div class="columns">
      <div class="column">
        <label for="no-of-storey">No. of Storey:</label>
        <input v-model="property.noOfStorey" type="number" id="no-of-storey" name="no-of-storey" placeholder="1" min="1" required><br><br>

        <label for="year-built">Year Built:</label>
        <input v-model="property.yearBuilt" type="number" id="year-built" name="year-built" :max="currentYear" placeholder="1991" required>

        <label for="floor-area">Floor Area (sq. meters):</label>
        <input v-model="property.floorArea" type="number" id="floor-area" name="floor-area" min="1" placeholder="120" required><br><br>

        <label for="roofing">Roofing:</label>
        <select v-model="property.roofing" id="roofing" name="roofing" required @change="toggleOtherField('roofing')">
          <option value="galvanized-iron">Galvanized Iron</option>
          <option value="asbestos">Asbestos</option>
          <option value="brick">Brick</option>
          <option value="concrete">Concrete</option>
          <option value="other">Other (please specify)</option>
        </select>
        <input v-model="property.roofingOther" type="text" id="roofing-other" name="roofing-other" placeholder="Specify if other" :style="{ display: property.roofing === 'other' ? 'block' : 'none' }"><br><br>

        <label for="occupancy">Occupancy:</label>
        <select v-model="property.occupancy" id="occupancy" name="occupancy" required @change="toggleOtherField('occupancy')">
          <option value="office">Office</option>
          <option value="apartment-townhouse">Apartment/Townhouse</option>
          <option value="retail-store">Retail Store</option>
          <option value="clinic">Clinic</option>
          <option value="warehouse">Warehouse (please specify)</option>
          <option value="residential">Residential</option>
          <option value="condominium">Condominium</option>
          <option value="restaurant">Restaurant</option>
          <option value="school">School</option>
          <option value="industrial-factory">Industrial/Factory (please specify)</option>
        </select>
        <input v-model="property.occupancyOther" type="text" id="occupancy-other" name="occupancy-other" placeholder="Specify if warehouse or industrial/factory" :style="{ display: property.occupancy === 'warehouse' || property.occupancy === 'industrial-factory' ? 'block' : 'none' }"><br><br>

        <label for="number-of-tenants">Number of Tenants:</label>
        <input v-model="property.numberOfTenants" type="number" id="number-of-tenants" name="number-of-tenants" min="0" placeholder="1" required><br><br>

        <label for="type_of_construction">Type of Construction (Exterior Walls only):</label>
        <select v-model="property.typeOfConstruction" id="type_of_construction" name="type_of_construction" required>
          <option value="class-a">Class A</option>
          <option value="class-b">Class B</option>
          <option value="class-c">Class C/Light Materials</option>
        </select>
      </div>
      <div class="column">
        <label><b>Boundaries:</b></label><br>
        <label for="boundary-front">Front:</label>
        <input v-model="property.boundaryFront" type="number" id="boundary-front" name="boundary-front" placeholder="Distance in meters" required><br><br>
        <label for="boundary-right">Right:</label>
        <input v-model="property.boundaryRight" type="number" id="boundary-right" name="boundary-right" placeholder="Distance in meters" required><br><br>
        <label for="boundary-left">Left:</label>
        <input v-model="property.boundaryLeft" type="number" id="boundary-left" name="boundary-left" placeholder="Distance in meters" required><br><br>
        <label for="boundary-rear">Rear:</label>
        <input v-model="property.boundaryRear" type="number" id="boundary-rear" name="boundary-rear" placeholder="Distance in meters" required><br><br>
      </div>
    </div>
    <br>
    <div id="construction-information">
      <h3>Construction Information</h3>
      <table>
        <tr>
          <th>Class</th>
          <th>Materials</th>
        </tr>
        <tr>
          <td>Class A</td>
          <td>
            <ul>
              <li>Reinforced Concrete</li>
              <li>Concrete Hollow Blocks</li>
              <li>Bricks</li>
              <li>Stones</li>
              <li>Sheets of Galvanized Iron</li>
              <li>with CHB zocalo wall</li>
              <li>Steel</li>
              <li>Asbestos</li>
              <li>Aluminum</li>
              <li>Open-sided sturctures with solid or hard roof with concrete post</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>Class B</td>
          <td>
            <ul>
              <li>Concrete and Timber</li>
              <li>Entirely of timber ir timber products or mixed construction or more than 50% timber of the total external wall area</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>Class C</td>
          <td>
            <ul>
              <li>Bamboo</li>
              <li>Sawali</li>
              <li>Nipa</li>
              <li>Cogon</li>
              <li>Thatch</li>
              <li>Grass</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>Homecare Compre</td>
          <td>
            <ul>
              <li>Fire/Lightning</li>
              <li>Typhoon</li>
              <li>Flood</li>
              <li>Extended Cover</li>
              <li>Riot and Strike</li>
              <li>Malicious Damage</li>
              <li>Robbery/Burglary</li>
              <li>Broad Water Damage</li>
              <li>Bowtap</li>
            </ul>
          </td>
        </tr>
      </table>
    </div><br><br>

    <div class="column other-information">
      <label><b>Other Property Information:</b></label><br><br>

      <label for="loc-congested-area">Is the property located in a congested area?</label>
      <select v-model="property.locCongestedArea" id="loc-congested-area" name="loc-congested-area" required @change="toggleInfo('locCongestedArea')">
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select><br><br>
      <div id="loc-congested-area-info" :style="{ display: property.locCongestedArea === 'yes' ? 'block' : 'none' }">
        <label for="loc-congested-area-details">Please provide details:</label>
        <input v-model="property.locCongestedAreaDetails" type="text" id="loc-congested-area-details" name="loc-congested-area-details"><br><br>
      </div>

      <label for="loc-explosive">Does the property have explosives?</label>
      <select v-model="property.locExplosive" id="loc-explosive" name="loc-explosive" required @change="toggleInfo('locExplosive')">
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select><br><br>
      <div id="loc-explosive-info" :style="{ display: property.locExplosive === 'yes' ? 'block' : 'none' }">
        <label for="loc-explosive-details">Please provide details:</label>
        <input v-model="property.locExplosiveDetails" type="text" id="loc-explosive-details" name="loc-explosive-details"><br><br>
      </div>

      <label for="loc-flood-prone">Is the property located in a flood-prone area?</label>
      <select v-model="property.locFloodProne" id="loc-flood-prone" name="loc-flood-prone" required @change="toggleInfo('locFloodProne')">
      <option value="yes">Yes</option>
        <option value="no">No</option>
      </select><br><br>
      <div id="loc-flood-prone-info" :style="{ display: property.locFloodProne === 'yes' ? 'block' : 'none' }">
        <label for="loc-flood-prone-details">Please provide details:</label>
        <input v-model="property.locFloodProneDetails" type="text" id="loc-flood-prone-details" name="loc-flood-prone-details"><br><br>
      </div>

      <label for="fire-loss">Has the property experienced fire loss?</label>
        <select v-model="property.fireLoss" id="fire-loss" name="fire-loss" required @change="toggleInfo('fireLoss')">
            <option value="yes">Yes</option>
            <option value="no">No</option>
        </select><br><br>

      <div id="fire-loss-info" :style="{ display: property.fireLoss === 'yes' ? 'block' : 'none' }">
        <label for="fire-loss-date">When? (Date):</label>
        <input v-model="property.fireLossDate" type="date" id="fire-loss-date" name="fire-loss-date"><br><br>
      </div>

      <label for="policy-cancelled">Have you ever had a policy of fire insurance cancelled?</label>
      <select v-model="property.policyCancelled" id="policy-cancelled" name="policy-cancelled" required @change="toggleInput('policyCancelled')">
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select><br><br>
      <div id="policy-cancelled-info" :style="{ display: property.policyCancelled === 'yes' ? 'block' : 'none' }">
        <input v-model="property.policyCancelledCompany" type="text" id="policy-cancelled-company" name="policy-cancelled-company" placeholder="If yes, specify company" required>
        <label for="policy-cancelled-date" id="policy-cancelled-date-label">When? (Date):</label>
        <input v-model="property.policyCancelledDate" type="date" id="policy-cancelled-date" name="policy-cancelled-date"><br><br>
      </div>

      <label for="risk-declined">Have you ever had this risk declined by any other company?</label>
      <select v-model="property.riskDeclined" id="risk-declined" name="risk-declined" required @change="toggleInput('riskDeclined')">
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select><br><br>
      <div id="risk-declined-info" :style="{ display: property.riskDeclined === 'yes' ? 'block' : 'none' }">
        <input v-model="property.riskDeclinedCompany" type="text" id="risk-declined-company" name="risk-declined-company" placeholder="If yes, specify company" required>
        <label for="risk-declined-date" id="risk-declined-date-label">When? (Date):</label>
        <input v-model="property.riskDeclinedDate" type="date" id="risk-declined-date" name="risk-declined-date"><br><br>
      </div>
    </div>
        <button @click="submitPropertyDescription">Proceed</button>
  </div>
</template>

<script>
import supabase from '@/supabase';

export default {
  data() {
    return {
      property: this.getDefaultPropertyState(),
    };
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
  methods: {
    getDefaultPropertyState() {
      return {
        noOfStorey: null,
        yearBuilt: null,
        floorArea: null,
        roofing: 'galvanized-iron',
        roofingOther: '',
        occupancy: 'office',
        occupancyOther: '',
        numberOfTenants: null,
        typeOfConstruction: 'class-a',
        boundaryFront: null,
        boundaryRight: null,
        boundaryLeft: null,
        boundaryRear: null,
        locCongestedArea: 'no',
        locCongestedAreaDetails: '',
        locExplosive: 'no',
        locExplosiveDetails: '',
        locFloodProne: 'no',
        locFloodProneDetails: '',
        fireLoss: 'no',
        fireLossDate: null,
        policyCancelled: 'no',
        policyCancelledCompany: '',
        policyCancelledDate: null,
        riskDeclined: 'no',
        riskDeclinedCompany: '',
        riskDeclinedDate: null,
      };
    },
    toggleOtherField(fieldName) {
      if (fieldName === 'roofing' && this.property.roofing !== 'other') {
        this.property.roofingOther = '';
      }
      if (fieldName === 'occupancy' && !['warehouse', 'industrial-factory'].includes(this.property.occupancy)) {
        this.property.occupancyOther = '';
      }
    },
    toggleInfo(fieldName) {
      if (this.property[fieldName] === 'no') {
        this.property[`${fieldName}Details`] = '';
      }
      if (fieldName === 'fireLoss') {
        this.property.fireLossDate = null;
      }
    },
    toggleInput(fieldName) {
      if (this.property[fieldName] === 'no') {
        this.property[`${fieldName}Date`] = null;
        if (['policyCancelled', 'riskDeclined'].includes(fieldName)) {
          this.property[`${fieldName}Company`] = '';
        }
      }
    },
    async submitPropertyDescription() {
      try {
        let clientData = this.$store.state.client;
        let propertyInformationData = this.$store.state.property;

        if (!clientData?.client_id) {
          alert('Error: Client information is missing. Please complete the client form first.');
          return;
        }

        // Fetch property information if missing
        if (!propertyInformationData?.id) {
          const { data: latestProperty, error: fetchError } = await supabase
            .from('propertyinformation')
            .select('id')
            .eq('client_id', clientData.client_id)
            .single();

          if (fetchError || !latestProperty) {
            alert('Error: Property information is missing. Please fill out the property information form first.');
            return;
          }

          this.$store.commit('setProperty', latestProperty);
          propertyInformationData = latestProperty;
        }

        const propertyDescriptionData = {
          ...this.property,
          propertyinformation_id: propertyInformationData.id,
        };

        const { error } = await supabase.from('propertydescription').insert([
          {
            propertyinformation_id: propertyDescriptionData.propertyinformation_id,
            no_of_storey: propertyDescriptionData.noOfStorey,
            year_built: propertyDescriptionData.yearBuilt,
            floor_area: propertyDescriptionData.floorArea,
            roofing: propertyDescriptionData.roofing,
            roofing_other: propertyDescriptionData.roofingOther,
            occupancy: propertyDescriptionData.occupancy,
            occupancy_other: propertyDescriptionData.occupancyOther,
            number_of_tenants: propertyDescriptionData.numberOfTenants,
            type_of_construction: propertyDescriptionData.typeOfConstruction,
            boundary_front: propertyDescriptionData.boundaryFront,
            boundary_right: propertyDescriptionData.boundaryRight,
            boundary_left: propertyDescriptionData.boundaryLeft,
            boundary_rear: propertyDescriptionData.boundaryRear,
            loc_congested_area: propertyDescriptionData.locCongestedArea,
            loc_congested_area_details: propertyDescriptionData.locCongestedAreaDetails,
            loc_explosive: propertyDescriptionData.locExplosive,
            loc_explosive_details: propertyDescriptionData.locExplosiveDetails,
            loc_flood_prone: propertyDescriptionData.locFloodProne,
            loc_flood_prone_details: propertyDescriptionData.locFloodProneDetails,
            fire_loss: propertyDescriptionData.fireLoss,
            fire_loss_date: propertyDescriptionData.fireLossDate,
            policy_cancelled: propertyDescriptionData.policyCancelled,
            policy_cancelled_company: propertyDescriptionData.policyCancelledCompany,
            policy_cancelled_date: propertyDescriptionData.policyCancelledDate,
            risk_declined: propertyDescriptionData.riskDeclined,
            risk_declined_company: propertyDescriptionData.riskDeclinedCompany,
            risk_declined_date: propertyDescriptionData.riskDeclinedDate,
          },
        ]);

        if (error) {
          console.error('Error inserting property description:', error);
          alert(`Submission failed: ${error.message}`);
          return;
        }

        console.log('Property description submitted successfully.');
        alert('Property description saved successfully!');

        // Reset form fields
        this.property = this.getDefaultPropertyState();
      } catch (error) {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred.');
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
  margin-bottom: 5px;
}

input[type="text"],
input[type="number"],
input[type="date"],
select {
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

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

ul {
  list-style-type: disc;
  margin-left: 20px;
}
</style>