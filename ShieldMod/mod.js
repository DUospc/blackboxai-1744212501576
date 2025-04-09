// Shield Mod for People Playground
const SHIELD_RADIUS = 1.5;
const SHIELD_COLOR = "#ff0000";

let shieldActive = false;
let currentShield = null;

function createShieldEffect(holder) {
    const shield = Bodies.circle(
        holder.position.x,
        holder.position.y,
        SHIELD_RADIUS,
        {
            isStatic: true,
            render: {
                fillStyle: SHIELD_COLOR,
                opacity: 0.7
            },
            collisionFilter: {
                group: -1,
                category: 0x0002,
                mask: 0xFFFFFFFF
            },
            isSensor: false
        }
    );
    Composite.add(engine.world, shield);
    return shield;
}

function updateShieldPosition(holder, shield) {
    if (holder && shield) {
        Body.setPosition(shield, {
            x: holder.position.x,
            y: holder.position.y
        });
    }
}

function initMod() {
    // Create shield item
    const shieldItem = {
        name: "Shield",
        description: "Press F to toggle shield",
        spawn: (pos) => {
            const item = Bodies.rectangle(pos.x, pos.y, 0.5, 0.2, {
                render: {
                    fillStyle: "#333333"
                },
                isStatic: false,
                collisionFilter: {
                    group: -1
                }
            });
            
            // Add interaction
            item.interact = (holder) => {
                if (keyIsDown(70)) { // F key
                    shieldActive = !shieldActive;
                    
                    if (shieldActive) {
                        currentShield = createShieldEffect(holder);
                    } else if (currentShield) {
                        Composite.remove(engine.world, currentShield);
                        currentShield = null;
                    }
                }
                
                if (shieldActive && currentShield) {
                    updateShieldPosition(holder, currentShield);
                }
            };
            
            return item;
        }
    };
    
    // Register item
    registerItem("shield", shieldItem);
}

// Initialize mod when game loads
window.addEventListener("load", initMod);
