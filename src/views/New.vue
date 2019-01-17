<template>
  <div>
    <h2>Neues Produkt eintragen</h2>
    <form @submit.prevent="addItem()">
      <label for="label">
        <span>
          Produkt Label
          <span class="required">*</span>
        </span>
        <input type="text" class="input-field" name="label" v-model="label" required value>
      </label>
      <label for="price">
        <span>
          Preis (in cent)
          <span class="required">*</span>
        </span>
        <input type="text" class="input-field" name="price" v-model="price" required value>
      </label>
      <label for="link">
        <span>
          Link zum Produkt
          <span class="required">*</span>
        </span>
        <input type="text" class="input-field" name="link" v-model="link" required value>
      </label>
      <label for="categoryId">
        <span>
          Kategorie
          <span class="required">*</span>
        </span>
        
        <select>
          <option
            v-for="category in categories"
            :key="category.categoryId"
          >{{category.categoryLabel}}</option>
        </select>
      </label>
      <label>
        <span>Beschreibung</span>
        <textarea name="description" v-model="description"></textarea>
      </label>
      <label for="image">
        <span>Bild</span>
        <input type="text" class="input-field" name="image" v-model="image" value>
      </label>
      
      <label>
        <span></span>
        <button type="submit">Neues Produkt anlegen</button>
      </label>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { hlpr_createId } from "../../node_modules/hlpr/hlpr.js";

export default {
  name: "New",
  data() {
    return {
      link: "",
      label: "",
      description: "",
      price: "",
      image: "",
      categoryId: ""
    };
  },
  computed: {
    ...mapState(["categories"])
  },
  methods: {
    ...mapActions(["addItemAction"]),
    addItem: function() {
      const object = {
        itemId: hlpr_createId(),
        itemLink: this.link,
        itemLabel: this.label,
        itemPrice: this.price,
        itemImage: this.image,
        itemDescription: this.description,
        categoryId: this.categoryId,
        isOpen: false,
        isReserved: false,
        reservedBy: ""
      };

      this.addItemAction(object);
    }
  }
};
</script>

<style scoped lang="scss">
label {
  display: block;
  margin: 10px 0;

  & > span {
    display: inline-block;
    width: 200px;
    vertical-align: top;
  }

  .input-field {
    padding: 2px 5px;
    width: 200px;
  }

  textarea {
    padding: 2px 5px;
    width: 200px;
    height: 50px;
  }
  .required {
    color: red;
  }
}
</style>