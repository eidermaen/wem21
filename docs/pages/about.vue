<template>
  <div>
    <h1>About</h1>
    <p>
      Jona Ittermann @ HBRS
    </p>

    <h3 class="mt-5">Contact</h3>
    <form id="form" name="wem_contact" data-netlify="true" @submit.prevent="submitForm">
      <b-form-group label="Name" description="Enter your name.">
        <b-form-input name="name" type="text" required />
      </b-form-group>

      <b-form-group label="Email" description="Enter your email address.">
        <b-form-input name="email" type="email" required />
      </b-form-group>

      <b-form-group label="Your message" description="Let me know what you think!">
        <b-form-textarea name="message" required />
      </b-form-group>

      <b-button type="submit" variant="primary">Send!</b-button>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    submitForm() {
      const form = document.getElementById('form');
      const formData = new FormData(form);

      fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      })
        .then(() => console.log('Form successfully submitted'))
        .catch((error) => alert(error))
    }
  }
}
</script>
