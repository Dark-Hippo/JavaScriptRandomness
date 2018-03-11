(function() {
    'use strict';

    // array to hold the monsters to fight
    var monsters = [];
    // default player damage on attack
    var damage = 10;

    // default creature stats
    var creature = {
        name: 'creature',
        health: 10,
        isAlive: true,
        damage: 0
    };  

    // creature constructor
    function CreateCreature(stats) {
        // if stats object is not passed in, create an empty object literal so following lines won't error 
        // when trying to access the property of an 'undefinied' object
        var stats = stats || {};

        // create publically accessible stats on the creature, if property does not exist on the stats object
        // the use the default value on creature object literal
        this.name = stats.name || creature.name;
        this.health = stats.health || creature.health;
        this.isAlive = stats.isAlive || creature.isAlive;
        this.damage = stats.damage || creature.damage;

        // public hit function, for creature to take damage
        this.hit = function(damage) {
            if(this.isAlive)
                this.health -= damage;

            if(this.health <= 0)
                this.isAlive = false;
        };

        // public heal function, for creature to heal damage
        this.heal = function(health) {
            this.health += health;
            if(this.health > 0)
                this.isAlive = true;
        };
    };

    // create an orc creature using an object constructor and passing in an inline object literal containing
    // stats
    var orc = new CreateCreature({
        name: 'orc', 
        health: 100,
        damage: 20
    });
    // add orc to the monstars array
    monsters.push(orc);

    // as with the orc, create a goblin and add to the array
    var goblin = new CreateCreature({
        name: 'goblin', 
        health: 50,
        damage: 10
    });
    monsters.push(goblin);

    // ditto the necromancer
    var necromancer = new CreateCreature({
        name: 'necromancer', 
        health: 50,
        damage: 15
    });
    monsters.push(necromancer);

    // create a zombie using Object.create, with the necromancer as the zombie's prototype, and overriding the 
    // name and damage stats.
    var zombie1 = Object.create(necromancer, { name: { value: 'zombie1'}, damage: { value: 5 } });
    monsters.push(zombie1);
    var zombie2 = Object.create(necromancer, { name: { value: 'zombie2'}, damage: { value: 5 } });
    monsters.push(zombie2);
    var zombie3 = Object.create(necromancer, { name: { value: 'zombie3'}, damage: { value: 5 } });
    monsters.push(zombie3);
    var zombie4 = Object.create(necromancer, { name: { value: 'zombie4'}, damage: { value: 5 } });
    monsters.push(zombie4);

    // create a minotaur creature using the Object.create to call an object constructor
    var minotaur = Object.create(new CreateCreature(
        {name: 'minotaur', health: 200, damage: 25} // stats
    ));
    monsters.push(minotaur);

    // create a pretty unicorn using only the default stats
    var unicorn = new CreateCreature();
    monsters.push(unicorn);

    var output = document.getElementById('output');
    output.textContent = 'number of monsters = ' + monsters.length;

    var target = document.getElementById('target');

    function redraw() {
        if(output) output.innerHTML = '';

        monsters.forEach((creature, index, array) => {
            var li = document.createElement('li');
            li.textContent = 'Type: ' + creature.name + ', Health: ' + creature.health + ', isAlive: ' + creature.isAlive;
            if(output)
                output.appendChild(li);
        });
    };

    monsters.forEach((creature, index, array) => {
        var option = document.createElement('option');
        option.text = creature.name;
        option.value = creature.name;
        if(target)
            target.appendChild(option);
    });    
    
    redraw();
    
    var attack = document.getElementById('attack');
    attack.addEventListener('click', function(event) {
        var chosenTarget = monsters.find(m => m.name === target.value);
        chosenTarget.hit(damage);
        redraw();
    });

}());