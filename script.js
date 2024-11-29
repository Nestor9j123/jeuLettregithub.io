//chargemment du fichier texte .txt
fetch("listes.txt")
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur réseau');
    }
    return response.text();
  })
  .then(data => {
    let wordlist = data.split("\n").filter(word => word.trim() !== ""); // Filtrer les lignes vides
    let randomIndex = Math.floor(Math.random() * wordlist.length);
    const motgess = wordlist[randomIndex].trim(); // Trim pour enlever les espaces
    alert(motgess);
    let motlength = motgess.length;
    let cache = "*".repeat(motlength); // Utiliser repeat pour créer le mot caché
    document.getElementById("word").innerHTML = cache;

    let gessinput = document.getElementById("texte");
    let gessbutton = document.getElementById("submit");
    let result = document.getElementById("resultat");
    let link = document.getElementById("restort");
    let word=document.getElementById("word");
    let container=document.getElementById("container");
    
    gessbutton.onclick = function() {
      let guess = gessinput.value.toLowerCase(); // Convertir en minuscule
      gessinput.value = ""; // Réinitialiser le champ de saisie

      if (guess.length !== 1) {
        result.innerHTML = "Entrer une seule lettre";
      } else if (motgess.indexOf(guess) === -1) {
        result.innerHTML = "Mauvaise lettre";
      } else {
        for (let i = 0; i < motlength; i++) {
          if (motgess[i] === guess) {
            cache = cache.substr(0, i) + guess + cache.substr(i + 1);
            
          }
        }
        document.getElementById("word").innerHTML = cache;

        if (cache === motgess) {
          result.innerHTML = "Bravo, vous avez trouvé le mot !";
          gessinput.style.display = "none";
          gessbutton.style.display = "none";
          link.style.display = "block";
          link.style.marginLeft="20px";
          word.style.display="none";
          container.style.height="150px";
          link.style.marginTop="-60px";
          result.style.marginTop="-70px"
          result.style.marginLeft="22px";
          container.style.transition="4s";
          link.style.cursor="pointer";

        }
      }
    };
  })
  .catch(error => {
    console.error("Il y a eu un problème avec le fetch : ", error);
  });
