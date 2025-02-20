document.addEventListener('DOMContentLoaded', function() {

    const shadowBoxes = document.querySelectorAll(".shadow-box");
    const lists = document.querySelectorAll("li");

    console.log(shadowBoxes.length);

    fetch("./data.json") // Fetch JSON data
      .then((response) => response.json())
      .then((data) => {
        // Update box titles
        data.forEach((item, index) => {
          console.log(item.timeframes);
          if (index < shadowBoxes.length) {
            let box = shadowBoxes[index];
            let titleElement = box.querySelector("h6");

            if (titleElement) {
              titleElement.innerHTML = item.title; // Assign title
            }

            // Store timeframes inside the element for later use
            box.dataset.timeframes = JSON.stringify(item.timeframes);
          }
        });



        // Update all shadow boxes with daily timeframes

        shadowBoxes.forEach((box) => {
          let timeframes = JSON.parse(box.dataset.timeframes); // Retrieve stored data
          let h2 = box.querySelector("h2");
          let p = box.querySelector("p");
            h2.innerHTML = `${timeframes.daily.current}hrs`;
            p.innerHTML = `Yesterday - ${timeframes.daily.previous}hrs`;
          
        });


        // Attach event listener to category list items 
        
        lists.forEach((li) => {
          li.addEventListener("click", (e) => {
            console.log(e.target.innerHTML);
            let category = e.target.innerHTML.toLowerCase(); // Convert tp lowercase for matching

            // Update all shadow boxes based on selected category
            shadowBoxes.forEach((box) => {
              let timeframes = JSON.parse(box.dataset.timeframes); 
              let h2 = box.querySelector("h2");
              let p = box.querySelector("p");

              if (category === "daily") {
                h2.innerHTML = `${timeframes[category].current}hrs`;
                p.innerHTML = `Yesterday - ${timeframes[category].previous}hrs`;
              } else if (category === "weekly") {
                h2.innerHTML = `${timeframes[category].current}hrs`;
                p.innerHTML = `Last Week - ${timeframes[category].previous}hrs`;
              } else {
                h2.innerHTML = `${timeframes[category].current}hrs`;
                p.innerHTML = `Last Month - ${timeframes[category].previous}hrs`;
              }
            });
          });
        });
      })
      .catch((error) => console.error("Error fetching JSON:", error));

});