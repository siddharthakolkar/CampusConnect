const events = [
    {
        id: 1,
        title: "Web Development Workshop",
        category: "tech",
        date: "15 September 2026",
        time: "10:00 AM",
        description: "Learn the fundamentals of modern web development using HTML, CSS and JavaScript."
    },

    {
        id: 2,
        title: "AI & Machine Learning",
        category: "tech",
        date: "20 September 2026",
        time: "11:00 AM",
        description: "Explore the basics of artificial intelligence and machine learning through practical examples."
    },

    {
        id: 3,
        title: "Campus Hackathon",
        category: "tech",
        date: "25 September 2026",
        time: "9:00 AM",
        description: "Build innovative solutions, work with a team and solve real-world problems."
    },

    {
        id: 4,
        title: "Cultural Fest",
        category: "cultural",
        date: "28 September 2026",
        time: "5:00 PM",
        description: "Celebrate creativity, culture and talent through music, dance and performances."
    },

    {
        id: 5,
        title: "Cricket Tournament",
        category: "sports",
        date: "2 October 2026",
        time: "4:00 PM",
        description: "Participate in an exciting campus cricket tournament and compete with fellow students."
    }
];


const clubs = [
    {
        name: "GDG Club",
        category: "Technology",
        description: "Learn web development, Google technologies, AI and modern software development.",
        focus: "Web Development & Google Technologies"
    },

    {
        name: "Robotics Club",
        category: "Technology",
        description: "Build robots, work with electronics and explore automation and robotics.",
        focus: "Robotics & Automation"
    },

    {
        name: "STES Racing Club",
        category: "Engineering",
        description: "Design, build and race innovative vehicles while learning engineering and teamwork.",
        focus: "Automotive Engineering"
    },

    {
        name: "Rocketry Club",
        category: "Aerospace",
        description: "Explore aerospace, rocket design and propulsion through hands-on projects.",
        focus: "Aerospace & Rocket Design"
    }
];


// ==================== EVENTS ====================

const eventContainer =
    document.querySelector(".event-container");

const searchInput =
    document.getElementById("searchInput");

const filterButtons =
    document.querySelectorAll(".filter-btn");

let selectedCategory = "all";

let currentEvent = null;


function displayEvents(eventList) {

    eventContainer.innerHTML = "";

    eventList.forEach(function (event) {

        const eventCard =
            document.createElement("div");

        eventCard.classList.add("event-card");

        eventCard.setAttribute(
            "data-category",
            event.category
        );

        eventCard.innerHTML = `
            <h3>${event.title}</h3>

            <p class="event-info">
                📅 ${event.date}
            </p>

            <p class="event-info">
                ⏰ ${event.time}
            </p>

        <p class="event-info">📍 SCOE Campus</p>

        <p class="event-category">
            ${event.category.toUpperCase()}
        </p>

         <p>${event.description}</p>

        <button class="view-event" data-event-id="${event.id}">View Event</button>
        `;

        eventContainer.appendChild(eventCard);
    });
}


function applyFilters() {

    const searchText =
        searchInput.value.toLowerCase();

    const filteredEvents =
        events.filter(function (event) {

            const matchesSearch =
                event.title
                    .toLowerCase()
                    .includes(searchText);

            const matchesCategory =
                selectedCategory === "all" ||
                event.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });

    displayEvents(filteredEvents);
}


searchInput.addEventListener("input", function () {

    applyFilters();

});


filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        selectedCategory =
            button.dataset.filter;

        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        applyFilters();

    });

});


displayEvents(events);


// ==================== EVENT MODAL ====================

const eventModal =
    document.getElementById("eventModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalDate =
    document.getElementById("modalDate");

const modalCategory =
    document.getElementById("modalCategory");

const modalLocation =
    document.getElementById("modalLocation");

const modalDescription =
    document.getElementById("modalDescription");

const closeModal =
    document.getElementById("closeModal");


eventContainer.addEventListener("click", function (event) {

    if (event.target.classList.contains("view-event")) {

        const eventId =
            Number(event.target.dataset.eventId);

        const selectedEvent =
            events.find(function (event) {

                return event.id === eventId;

            });


        if (!selectedEvent) {
            return;
        }


        currentEvent = selectedEvent;


        modalTitle.textContent =
            selectedEvent.title;

        modalDate.textContent =
            "📅 " + selectedEvent.date;

        modalCategory.textContent =
            "🏷️ " + selectedEvent.category;

        modalLocation.textContent =
            "📍 SCOE Campus";

        modalDescription.textContent =
            selectedEvent.description;


        // Reset registration form
        studentName.value = "";
        studentEmail.value = "";
        registrationMessage.textContent = "";

        eventModal.style.display = "flex";

    }

});


closeModal.addEventListener("click", function () {

    eventModal.style.display = "none";

});


eventModal.addEventListener("click", function (event) {

    if (event.target === eventModal) {

        eventModal.style.display = "none";

    }

});


// ==================== CALENDAR ====================

const calendarBtn =
    document.getElementById("calendarBtn");


function formatCalendarDate(date, time) {

    const eventDate =
        new Date(date + " " + time);

    const year =
        eventDate.getFullYear();

    const month =
        String(eventDate.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(eventDate.getDate())
            .padStart(2, "0");

    const hours =
        String(eventDate.getHours())
            .padStart(2, "0");

    const minutes =
        String(eventDate.getMinutes())
            .padStart(2, "0");


    return `${year}${month}${day}T${hours}${minutes}00`;
}


calendarBtn.addEventListener("click", function () {

    if (!currentEvent) {
        return;
    }


    const startDate =
        formatCalendarDate(
            currentEvent.date,
            currentEvent.time
        );


    const eventDate =
        new Date(
            currentEvent.date +
            " " +
            currentEvent.time
        );


    eventDate.setHours(
        eventDate.getHours() + 1
    );


    const endDate =
        formatCalendarDate(
            currentEvent.date,

            eventDate.toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit"
            })
        );


    const calendarData = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${currentEvent.title}
DTSTART:${startDate}
DTEND:${endDate}
LOCATION:SCOE Campus
DESCRIPTION:${currentEvent.description}
END:VEVENT
END:VCALENDAR
`;


    const blob =
        new Blob(
            [calendarData],
            {
                type: "text/calendar"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        `${currentEvent.title}.ics`;


    link.click();


    URL.revokeObjectURL(url);

});

// ==================== EVENT REGISTRATION ====================

const studentName =
    document.getElementById("studentName");

const studentEmail =
    document.getElementById("studentEmail");

const registerBtn =
    document.getElementById("registerBtn");

const registrationMessage =
    document.getElementById("registrationMessage");


registerBtn.addEventListener("click", function() {

    if (
        studentName.value === "" ||
        studentEmail.value === ""
    ) {
        registrationMessage.textContent =
            "Please fill in all fields.";

        registrationMessage.className = "error";

    } else if (!studentEmail.value.includes("@")) {

        registrationMessage.textContent =
            "Please enter a valid email.";

        registrationMessage.className = "error";

    } else {

        registrationMessage.textContent =
            "Registration successful! 🎉";

        registrationMessage.className = "success";
    }

});

// ==================== CLUBS ====================

const clubContainer =
    document.querySelector(".club-container");


function displayClubs() {

    clubContainer.innerHTML = "";


    clubs.forEach(function (club, index) {

        const clubCard =
            document.createElement("div");


        clubCard.classList.add("club-card");


        clubCard.innerHTML = `
            <h3>${club.name}</h3>

            <p class="club-category">
                🏷️ ${club.category}
            </p>

            <p>
                ${club.description}
            </p>

            <p class="club-focus">
                🎯 ${club.focus}
            </p>

            <button
                class="view-club"
                data-club-id="${index}">
                View Club
            </button>
        `;


        clubContainer.appendChild(clubCard);

    });

}


displayClubs();


// ==================== CLUB MODAL ====================

const clubModal =
    document.getElementById("clubModal");

const clubModalTitle =
    document.getElementById("clubModalTitle");

const clubModalCategory =
    document.getElementById("clubModalCategory");

const clubModalDescription =
    document.getElementById("clubModalDescription");

const clubModalFocus =
    document.getElementById("clubModalFocus");

const closeClubModal =
    document.getElementById("closeClubModal");


clubContainer.addEventListener("click", function (event) {

    if (event.target.classList.contains("view-club")) {

        const clubId =
            Number(event.target.dataset.clubId);


        const selectedClub =
            clubs[clubId];


        if (!selectedClub) {
            return;
        }


        clubModalTitle.textContent =
            selectedClub.name;


        clubModalCategory.textContent =
            "🏷️ " + selectedClub.category;


        clubModalDescription.textContent =
            selectedClub.description;


        clubModalFocus.textContent =
            "🎯 " + selectedClub.focus;


        clubModal.style.display =
            "flex";

    }

});


closeClubModal.addEventListener("click", function () {

    clubModal.style.display = "none";

});


clubModal.addEventListener("click", function (event) {

    if (event.target === clubModal) {

        clubModal.style.display = "none";

    }

});