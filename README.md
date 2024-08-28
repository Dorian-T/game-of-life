# README

## Description

Le jeu de la vie est un automate cellulaire inventé par le mathématicien britannique John Horton Conway en 1970. C'est un jeu à 0 joueur, ce qui signifie que son évolution est déterminée par son état initial, sans nécessiter d'autre entrée. Le jeu se joue sur une grille de cellules, où chaque cellule peut être vivante ou morte. Les cellules évoluent selon trois de règles :

- Une cellule morte avec exactement 3 cellules voisines vivantes devient vivante.
- Une cellule vivante avec 2 ou 3 cellules voisines vivantes reste vivante.
- Dans tous les autres cas, la cellule devient morte.

## Fonctionnalités

- L'utilisateur peut remplir aléatoirement la grille ou dessiner la configuration de départ à la main.
- L'utilisateur peut lancer la simulation, faire pause, avancer pas à pas ou réinitialiser la grille.
- L'utilisateur peut exporter la configuration de la grille en cours en png ou en json.
- L'utilisateur peut importer une configuration de grille depuis un fichier json.

## Essayer

Le projet est disponible en ligne à l'adresse suivante : [dorian-tonnis.fr/projects/game-of-life](https://dorian-tonnis.fr/projects/game-of-life).
