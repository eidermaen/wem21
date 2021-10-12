<template>
  <div>
    <h1>About</h1>
    <p>
      Jona Ittermann @ HBRS
    </p>

    <div class="form">
      <h3>Contact</h3>
      <form name="wem_contact" method="post" action="/form-success" data-netlify="true" data-netlify-honeypot="bot-field">
        <div class="bot">
          <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
        </div>
        <input type="hidden" name="form-name" value="wem_contact" />
        <div class="form-group">
          <label for="name">
            Name
          </label>
          <input id="name" name="name" type="text" required />
          <div class="description">Enter your name.</div>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" required />
          <div class="description">Enter your email address.</div>
        </div>

        <div class="form-group">
          <label>Your message</label>
          <textarea name="message"></textarea>
          <div class="description">Let me know what you think!</div>
        </div>

        <button class="btn btn-submit" type="submit">Send!</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.bot {
  position: absolute;
  display: none;
}

.form {
  margin-top: 2rem;
  width: 80%;
}

.form-group {
  margin: 1rem 0;
}

label {
  display: block;
  margin-bottom: 3px;
}

input, textarea {
  padding: 10px 5px;
  width: 100%;
  border-color: #457B9D;
  border-width: 1px;
  border-radius: 6px;
}

input:focus, textarea:focus {
  border: 2px solid #FFBD00;
  outline: 0;
  box-shadow: 0 0 10px #FFBD00;
}

.description {
  margin-top: 4px;
  font-size: small;
  color: gray;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: .3rem;
}

button:hover {
  cursor: pointer;
}

.btn-submit {
  background-color: #26C485;
  color: #146746;
}
</style>
