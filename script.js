async function getEvent() {
  const url =
    "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-FTB-ET-WEB-PT/events";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    const events = data.data;

    const container = document.getElementById("container");

    events.forEach((event) => {
      const eventDiv = document.createElement("div");
      eventDiv.classList.add("event-item");

      const paragraph = document.createElement("p");
      paragraph.textContent = `Party ID: ${event.id}, Name: ${event.name}, Description: ${event.description}, Date/Time: ${event.date}, Location: ${event.location}`;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", async () => {
        try {
          const deleteResponse = await fetch(`${url}/${event.id}`, {
            method: "DELETE",
          });

          if (!deleteResponse.ok) {
            throw new Error(
              `Failed to delete. Status: ${deleteResponse.status}`
            );
          }

          eventDiv.remove();
        } catch (error) {
          console.error("Error deleting event:", error.message);
        }
      });

      eventDiv.appendChild(paragraph);
      eventDiv.appendChild(deleteButton);

      container.appendChild(eventDiv);
    });
  } catch (error) {
    console.error("Error fetching events:", error.message);
  }
}

async function addEvent(eventData) {
  const url =
    "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-FTB-ET-WEB-PT/events";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error(`Failed to add event. Status: ${response.status}`);
    }

    getEvent();
  } catch (error) {
    console.error("Error adding event:", error.message);
  }
}

document.getElementById("eventForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;
  const location = document.getElementById("location").value;

  const newEvent = {
    name,
    description,
    date,
    location,
  };

  addEvent(newEvent);

  event.target.reset();
});

getEvent();
