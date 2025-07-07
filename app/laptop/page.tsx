'use client'
import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { checkDevice } from "@/lib/deviceCheck";
import { Sprite } from "./SpriteClass";
import { keys, redirectionsMapProps } from "./types";
import { collisions, redirections } from "../../public/data";
import { Boundry } from "./BoundaryClass";
import RightSidebar from "@/components/RightSidebar";
import { collisionCheck } from "./utils";
import { Button } from "@/components/ui/button";

export default function LaptopPage() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  if (checkDevice() !== "laptop") {
    router.push("/traditional");
  }

  function MapData(arr: number[], width: number) {
    const map = [];
    for (let i = 0; i < arr.length; i += width) {
      map.push(arr.slice(i, i + width));
    }
    return map;
  }

  const collisionsMap: number[][] = MapData(collisions, 70);

  const redirectionsMap: redirectionsMapProps[] = useMemo(() => {
    return redirections.map((redirection) => ({
      id: redirection.id,
      title: redirection.title,
      description: redirection.description,
      link: redirection.link,
      data: MapData(redirection.data, 70),
    }));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) return console.error("Canvas element not found");
    const c = canvas.getContext("2d");
    if (!c) return console.error("Canvas context not found");

    c.clearRect(0, 0, canvas.width, canvas.height);
    
    const aspectRatio = 1024 / 576;
    const verticalPadding = 20;
    const horizontalPadding = 20;
    const availableHeight = window.innerHeight - (verticalPadding * 2);
    const availableWidth = window.innerWidth - (horizontalPadding * 2);
    const screenRatio = availableWidth / availableHeight;
    const boundries: Boundry[] = [];
    const redirects: { id: number, title: string, description: string, link: string, data: Boundry }[] = [];

    if (screenRatio < aspectRatio) {
      canvas.width = availableWidth;
      canvas.height = availableWidth / aspectRatio;
    } else {
      canvas.width = availableHeight * aspectRatio;
      canvas.height = availableHeight;
    }

    const offset = {
      x: -450,
      y: -120
    }

    

    const img = new Image();
    img.src = 'assets/portfolio_complete_map.png';

    const playerUp = new Image();
    playerUp.src = 'assets/playerUp.png';
    const playerDown = new Image();
    playerDown.src = 'assets/playerDown.png';
    const playerLeft = new Image();
    playerLeft.src = 'assets/playerLeft.png';
    const playerRight = new Image();
    playerRight.src = 'assets/playerRight.png';

    const foregroundImage = new Image();
    foregroundImage.src = 'assets/foreground.png';

    const lightsImage = new Image();
    lightsImage.src = 'assets/lights.png';  

    collisionsMap.forEach((row, i) => {
      row.forEach((symbol, j) => {
        console.log(symbol);
        if (symbol === 5242) {
          boundries.push(
            new Boundry({
              canvas: c,
              position: {
                x: j * Boundry.width + offset.x,
                y: i * Boundry.height + offset.y
              },
            })
          );
        }
      });
    });

    redirectionsMap.forEach((redirection) => {
      redirection.data.forEach((row, i) => {
        row.forEach((symbol, j) => {
          if (symbol === 6356) {
            redirects.push({
              id: redirection.id,
              title: redirection.title,
              description: redirection.description,
              link: redirection.link,
              data: new Boundry({
                canvas: c,
                position: {
                  x: j * Boundry.width + offset.x,
                  y: i * Boundry.height + offset.y
                },
              })
          });
          }
        });
      });
    });

    let bg: Sprite | null = null;
    bg = new Sprite({
      canvas: c,
      position: offset,
      image: img,
      velocity: {
        x: 3,
        y: 3
      },
      width: img.width,
      height: img.height,
    });

    let foreground: Sprite | null = null;
    foreground = new Sprite({
      canvas: c,
      position: offset,
      image: foregroundImage,
      velocity: {
        x: 2,
        y: 2
      },
      width: foregroundImage.width,
      height: foregroundImage.height,
    });

    let lights: Sprite | null = null;
    lights = new Sprite({
      canvas: c,
      position: offset,
      image: lightsImage,
      velocity: {
        x: 2,
        y: 2
      },
      width: lightsImage.width,
      height: lightsImage.height,
    });

    let player: Sprite | null = null;
    player = new Sprite({
      canvas: c,
      position: {
        x: canvas.width / 2 - 100 / 4 / 2,
        y: canvas.height / 2 - 35 / 2
      },
      image: playerDown,
      sprites: {
        up: playerUp, 
        down: playerDown,
        left: playerLeft, 
        right: playerRight
      },
      velocity: {
        x: 1,
        y: 1
      },
      frames: {
        max: 4,
        val: 0,
        elapsed: 0
      },
      width: playerDown.width,
      height: playerDown.height,
      offset: offset
    });


    const movables = [bg,  ...boundries];
    const redirectflow = {
      initiated: false
    };

    let moving = [1, 1, 1, 1];
    function animate() {
      if (bg) {
        const animationId = animationFrameRef.current = requestAnimationFrame(animate);
        c!.fillStyle = 'rgba(227, 242, 250, 1)';
        c?.fillRect(0, 0, canvas.width, canvas.height);
        bg.draw();
        boundries.forEach((boundry) => {
          boundry.draw!();
        });
        redirects.forEach((redirect) => {
          redirect.data.draw!();
        });
        lights!.animate({ animation: 'flicker', play: isDarkMode});
        player!.draw();
        foreground!.draw();


        if (redirectflow.initiated) return;
        moving = [1,1,1,1];
        player!.moving = false;

        if (keys.a.pressed || keys.d.pressed || keys.s.pressed || keys.w.pressed) {
          for(let i = 0; i < redirects.length; i++) {
            const redirect = redirects[i];
            const overlappingArea = (Math.min(player!.position.x + player!.SingleWidth!, redirect.data.position.x + redirect.data.width!) -
              Math.max(player!.position.x, redirect.data.position.x)) * 
              (Math.min(player!.position.y + player!.SingleHeight!, redirect.data.position.y + redirect.data.height!) -
              Math.max(player!.position.y, redirect.data.position.y));
            if (
              collisionCheck({
                rect1: player!,
                rect2: redirect.data
              }) && (overlappingArea > ((player!.SingleWidth! * player!.SingleHeight!) * 3 / 4)) &&
              Math.random() < 0.05
            ) {
              console.log("Redirect detected");
              window.cancelAnimationFrame(animationId);
              redirectflow.initiated = true;
              document.getElementById("overlappingDiv")!.style.opacity = "90%";
              document.getElementById("redirectionHeading")!.innerHTML = `${redirect.title} Page`;
              document.getElementById("redirectionDescription")!.innerHTML = redirect.description;
              document.getElementById("redirectionPara")!.innerHTML = `Do you want to be redirected to ${redirect.title} Page?`;
                let selectedOption = 0;
                const updateSelection = () => {
                const buttons = document.querySelectorAll("#confirmRedirection, #cancelRedirection");
                buttons.forEach((button, index) => {
                  if (index === selectedOption) {
                  button.classList.add("border-2", "border-blue-500");
                  } else {
                  button.classList.remove("border-2", "border-blue-500");
                  }
                });
                };

                updateSelection();

                document.getElementById("confirmRedirection")!.onclick = () => {
                router.push(redirect.link);
                };
                document.getElementById("cancelRedirection")!.onclick = () => {
                document.getElementById("overlappingDiv")!.style.opacity = "0%";
                redirectflow.initiated = false;
                window.requestAnimationFrame(animate);
                };

                window.addEventListener("keydown", (e) => {
                if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                  selectedOption = selectedOption === 0 ? 1 : 0;
                  updateSelection();
                } else if (e.key === "Enter") {
                  if (selectedOption === 0) {
                  router.push(redirect.link);
                  } else {
                  document.getElementById("overlappingDiv")!.style.opacity = "0%";
                  redirectflow.initiated = false;
                  window.requestAnimationFrame(animate);
                  }
                }
                });
              // window.cancelAnimationFrame(animationFrameRef.current!);
              // router.push(redirect.link);
              break;
            }
          }
        }

        if (keys.w.pressed) {
          player!.moving = true;
          player!.image = player!.sprites!.up;
          for(let i = 0; i < boundries.length; i++) {
            const boundry = boundries[i];
            if (
              collisionCheck({
                rect1: player!,
                rect2: {
                  ...boundry,
                  position: {
                    x: boundry.position.x,
                    y: boundry.position.y + bg.velocity.y
                  }
                }
              })
            ) {
              console.log("Collision detected");
              moving[0] = 0;
              break;
            }
          }
          if (moving[0]) {
            movables.forEach((movable) => {
              movable!.position.y += bg.velocity.y;
            });
            redirects.forEach((redirect) => {
              redirect.data.position.y += bg.velocity.y;
            });
          }
        }
        if (keys.a.pressed) {
          player!.moving = true;
          player!.image = player!.sprites!.left;
          for(let i = 0; i < boundries.length; i++) {
            const boundry = boundries[i];
            if (
              collisionCheck({
                rect1: player!,
                rect2: {
                  ...boundry,
                  position: {
                    x: boundry.position.x + bg.velocity.x,
                    y: boundry.position.y
                  }
                }
              })
            ) {
              console.log("Collision detected");
              moving[1] = 0;
              break;
            }
          }
          if (moving[1]) {
            movables.forEach((movable) => {
              movable!.position.x += bg.velocity.x;
            });
            redirects.forEach((redirect) => {
              redirect.data.position.x += bg.velocity.x;
            });
          }
        }
        if (keys.s.pressed) {
          player!.moving = true;
          player!.image = player!.sprites!.down;
          for(let i = 0; i < boundries.length; i++) {
            const boundry = boundries[i];
            if (
              collisionCheck({
                rect1: player!,
                rect2: {
                  ...boundry,
                  position: {
                    x: boundry.position.x,
                    y: boundry.position.y - bg.velocity.y
                  }
                }
              })
            ) {
              console.log("Collision detected");
              moving[2] = 0;
              break;
            }
          }
          if (moving[2]) {
            movables.forEach((movable) => {
              movable!.position.y -= bg.velocity.y;
            });
            redirects.forEach((redirect) => {
              redirect.data.position.y -= bg.velocity.y;
            });
          }
        }
        if (keys.d.pressed) {
          player!.moving = true;
          player!.image = player!.sprites!.right;
          for(let i = 0; i < boundries.length; i++) {
            const boundry = boundries[i];
            if (
              collisionCheck({
                rect1: player!,
                rect2: {
                  ...boundry,
                  position: {
                    x: boundry.position.x - bg.velocity.x,
                    y: boundry.position.y
                  }
                }
              })
            ) {
              console.log("Collision detected");
              moving[3] = 0;
              break;
            }
          }
          if (moving[3]) {
            movables.forEach((movable) => {
              movable!.position.x -= bg.velocity.x;
            });
            redirects.forEach((redirect) => {
              redirect.data.position.x -= bg.velocity.x;
            });
          }
        }
      }
    }
    animate();

    let draggable: (Boundry | Sprite)[] = [];
    window.addEventListener("mousedown", (e) => {
      const rect = canvas.getBoundingClientRect();
      if (e.clientX >= rect.left && 
        e.clientX <= rect.right && 
        e.clientY >= rect.top && 
        e.clientY <= rect.bottom) {
      draggable = movables.concat([player]);
      const startPos = draggable.map(movable => ({ x: movable!.position.x, y: movable!.position.y }));

      const moveHandler = (e: MouseEvent) => {
        const deltaX = e.movementX;
        const deltaY = e.movementY;
        
        draggable.forEach(drag => {
        drag!.position.x += deltaX;
        drag!.position.y += deltaY;
        });
      };

      document.addEventListener('mousemove', moveHandler);
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', moveHandler);
        draggable.forEach((drag, index) => {
        drag!.position.x = startPos[index].x;
        drag!.position.y = startPos[index].y;
        });
        player!.moving = true;
      });
      }
    });

    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case 'w':
        case 'ArrowUp':
          keys.w.pressed = true;
          break;
        case 'a':
        case 'ArrowLeft':
          keys.a.pressed = true;
          break;
        case 's':
        case 'ArrowDown':
          keys.s.pressed = true;
          break;
        case 'd':
        case 'ArrowRight':
          keys.d.pressed = true;
          break;
        case 'Enter':
          keys.enter.pressed = true;
          break;
        default:
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case 'w':
        case 'ArrowUp':
          keys.w.pressed = false;
          break;
        case 'a':
        case 'ArrowLeft':
          keys.a.pressed = false;
          break;
        case 's':
        case 'ArrowDown':
          keys.s.pressed = false;
          break;
        case 'd':
        case 'ArrowRight':
          keys.d.pressed = false;
          break;
        default:
          break;
      }
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    });
  }, [router, isDarkMode, collisionsMap, redirectionsMap]);

  return (
    <div className={`relative h-screen w-screen flex items-center justify-center px-6 py-4 ${isDarkMode ? "bg-[#1a1a1a]" : "bg-[#e0e6eb]"} gap-4`}>
      {/* Canvas Section */}
      <div className="relative w-auto h-auto flex items-center justify-center">
        <div id="overlappingDiv" className={`absolute inset-0 flex items-center justify-center ${isDarkMode ? "bg-primaryDark text-textPrimaryDark border-borderPrimaryDark" : "bg-primary text-textPrimary border-borderPrimary"} opacity-0 rounded-lg duration-300`} >
          <div className="flex flex-col md:flex-row w-11/12 md:w-3/4 lg:w-1/2 h-3/4 border-2 p-4 gap-4">
            <div className="flex-1 border-r-2 pr-4 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
              <h1 id="redirectionHeading" className="text-xl border-b-2 pb-2 font-bold"/>
              <p id="redirectionDescription" className="text-xs md:text-sm text-justify pt-2 leading-relaxed"/>
            </div>
            <div className="flex-1 pl-4 relative items-center justify-center">
              <div className="">
              <p id="redirectionPara" className="text-md mb-4"/>
              <div className="flex gap-4">
                <Button id='confirmRedirection' className="bg-[#a67c52] text-white cursor-pointer hover:bg-[#8c5f3b] transform hover:scale-105 transition-transform duration-300">Yes, Please</Button>
                <Button id='cancelRedirection' className="bg-[#a67c52] text-white cursor-pointer hover:bg-[#8c5f3b] transform hover:scale-105 transition-transform duration-300">Unfortunately, No</Button>
              </div>
              <p className={`text-sm`}><strong>Arrow keys</strong> to choose, <strong>Enter key</strong> to select</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <canvas className={`border border-solid rounded-lg ${isDarkMode ? "border-[#d3c6b1]" : "border-[#7a6c5d]"} shadow-2xl`} id="canvas"></canvas>
          <div
            id="overlay"
            className={`absolute inset-0 bg-black ${isDarkMode ? "opacity-50" : "opacity-0"}`}
          />
        </div>
      </div>
  
      {/* Right Sidebar */}
      <RightSidebar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </div>
  );
  
}