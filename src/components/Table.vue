<template>
  <div class="py-4 md:py-8 px-0 md:px-6 font-titillium overflow-y-auto bg-white">
    <table
      aria-describedby="table"
      class="w-full bg-white text-left rtl:text-right whitespace-normal"
    >
      <thead class="text-white uppercase bg-black">
        <tr l>
          <th
            class="px-4 py-3 text-xs md:text-sm font-normal"
            v-for="(column, key) in columns"
            :key="key"
          >
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="even:bg-lightblue border-b" v-for="(item, index) in items" :key="index">
          <td
            class="px-4 py-4 text-xs md:text-sm font-medium text-darktext whitespace-normal"
            v-for="(column, idx) in accessName"
            :key="idx"
          >
            <span v-if="column === 'Constructor'" class="text-lightdata">{{ item[column] }}</span>
            <span v-else>{{ item[column] }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    accessName: {
      type: Array,
      required: false
    }
  },
  name: 'TableComponent'
}
</script>
