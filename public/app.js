const typeOptions = document.querySelectorAll(".type-option");

typeOptions.forEach((option) => {
  option.addEventListener("click", () => {

    typeOptions.forEach((item) => {
      item.classList.remove("active");
    });

    option.classList.add("active");

    contentType.value = option.dataset.type;
  });
});

const generateBtn = document.getElementById("generateBtn");

const contentType = document.getElementById("contentType");

const topic = document.getElementById("topic");

const loading = document.getElementById("loading");

const errorBox = document.getElementById("error");

const resultSection = document.getElementById("resultSection");

const result = document.getElementById("result");

const copyBtn = document.getElementById("copyBtn");


generateBtn.addEventListener("click", async () => {

  const type = contentType.value;

  const userTopic = topic.value.trim();


  if (!userTopic) {

    showError("Please enter a topic.");

    return;
  }


  loading.classList.remove("hidden");

  errorBox.classList.add("hidden");

  resultSection.classList.add("hidden");

  generateBtn.disabled = true;


  try {

    const response = await fetch("/api/generate", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        type,
        topic: userTopic
      })

    });


    const data = await response.json();


    if (!response.ok) {

      throw new Error(
        data.message || "Something went wrong."
      );

    }


    result.textContent = data.content;

    resultSection.classList.remove("hidden");


  } catch (error) {

    showError(error.message);

  } finally {

    loading.classList.add("hidden");

    generateBtn.disabled = false;

  }

});


copyBtn.addEventListener("click", async () => {

  await navigator.clipboard.writeText(
    result.textContent
  );

  copyBtn.textContent = "Copied!";

  setTimeout(() => {
    copyBtn.textContent = "Copy";
  }, 1500);

});


function showError(message) {

  errorBox.textContent = message;

  errorBox.classList.remove("hidden");

}

topic.addEventListener("input", () => {
  const count = topic.value.length;

  document.getElementById("charCount").textContent =
    `${count} / 500`;
});