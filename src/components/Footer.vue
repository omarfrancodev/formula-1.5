<template>
  <footer class="bg-footer rounded-none space-x-2 bottom-0">
    <div
      class="w-full font-titillium mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between"
    >
      <span class="text-base text-black sm:text-center"
        >© 2024
        <a
          href="https://github.com/omarfrancodev"
          target="_blank"
          class="underline md:hover:text-lightbluetext"
          >Donnermar</a
        >. This website is not affiliated with F1.
      </span>
      <span class="text-black text-base pr-4">
        Data provided by
        <a
          class="text-black underline hover:text-indigo-700"
          href="https://ergast.com/mrd/"
          target="_blank"
          >Ergast</a
        >. Unofficial Formula 1 web site.
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>
