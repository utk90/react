export async function postMethod(userData) {
  const options = {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  return await fetch("/codebuddy.review/submit", options).then((res) =>
    res.json()
  ).catch(err => console.log(err));
}

export async function getMethod() {
  return await fetch("/codebuddy.review/posts").then((res) =>
    res.json()
  ).catch(err => console.log(err));
}