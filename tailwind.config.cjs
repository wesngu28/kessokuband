/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif']
    },
		extend: {
			screens: {
				'xs': '450px',
			},
			animation: {
        slideshow: 'slideshow 1s ease-out',
        slideshowslower: 'slideshow 2s ease-out',
      },
      keyframes: {
        slideshow: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
      },
		}
	},
	plugins: [],
}