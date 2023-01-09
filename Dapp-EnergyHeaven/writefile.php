<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = file_get_contents('php://input');
  $righe = file('mapping.txt', FILE_IGNORE_NEW_LINES);
  if (in_array($data, $righe)) {
    // il dato è già presente nel file
  } else {
    // il dato non è presente nel file
    // Apri il file in modalità scrittura
    $file = fopen("mapping.txt", "a");

    // Scrivi il valore ricevuto dal client nel file
    fputs($file, $data . "\n");
  
    // Chiudi il file
    fclose($file);
    echo $data;
  }
}


/*
// Legge il contenuto del file in un array, ogni riga viene salvata in un elemento dell'array
$righe = file('mapping.txt', FILE_IGNORE_NEW_LINES);

// Rimuove l'andare a capo finale dall'ultimo elemento dell'array
$ultimaRiga = array_pop($righe);
$ultimaRiga = rtrim($ultimaRiga);

// Aggiunge di nuovo l'ultima riga all'array
array_push($righe, $ultimaRiga);

// Apre il file in modalità scrittura
$file = fopen("mapping.txt", "w");

// Scrive il contenuto dell'array nel file, ogni elemento dell'array viene salvato in una riga
foreach ($righe as $riga) {
  fputs($file, $riga . "\n");
}

// Chiude il file
fclose($file);

*/

?>