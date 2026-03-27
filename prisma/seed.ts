import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.stepProgress.deleteMany()
  await prisma.step.deleteMany()
  await prisma.lab.deleteMany()
  await prisma.module.deleteMany()
  await prisma.user.deleteMany()

  const user = await prisma.user.create({
    data: {
      name: 'Louis Brent',
      email: 'louis@example.com',
    },
  })

  // Module 1
  await prisma.module.create({
    data: {
      title: 'Module 1: Hardware & Fundamentals',
      description: 'Understanding the physical components of computers and analyzing basic system performance. This module introduces you to diagnosing hardware and exploring basic system resources.',
      order: 1,
      labs: {
        create: [
          {
            title: 'Lab 1: Hardware Identification',
            objective: 'Identify ports, connectors, and internal components to understand physical interfaces.',
            prerequisites: 'A laptop or desktop PC. A smartphone with a USB cable.',
            order: 1,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'Physically inspect the exterior of your computer. Look at the sides and back to identify common ports. You are looking for: USB Type-A (rectangular), USB Type-C (small, oval), HDMI (trapezoid shaped for video), and RJ-45 (Ethernet network jack).',
                  expectedResult: 'You can positively identify the type of ports available on your hardware.',
                  question: 'How many total USB ports (Type-A and Type-C combined) do you see on your device?',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'To view live hardware metrics, we need to open the system monitor.\n\nOn Windows: Press Ctrl + Shift + Esc to open "Task Manager". If it looks small, click "More details" at the bottom. Click on the "Performance" tab.\n\nOn macOS: Press Cmd + Space to open Spotlight, type "Activity Monitor", and hit Enter.',
                  expectedResult: 'You should see live, moving graphs showing metrics for CPU, Memory (RAM), Disk usage, and Network activity.',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'To locate the exact CPU Model and total RAM capacity installed on your machine:\n\nOn Windows: Press Win + R to open the Run dialog. Type "msinfo32" and press Enter. In the "System Information" window, look for the rows labeled "Processor" and "Installed Physical Memory (RAM)".\n\nOn macOS: Click the Apple menu () in the top-left corner of your screen, then choose "About This Mac".',
                  expectedResult: 'You have found the exact manufacturer string and memory architecture of your machine.',
                  question: 'What is your system model, exact processor architecture, and total RAM capacity?',
                  order: 3,
                }
              ]
            }
          },
          {
            title: 'Lab 2: External Device Simulation',
            objective: 'Connect external peripherals (e.g. smartphones, monitors) and analyze how the OS detects and handles new hardware interrupts.',
            prerequisites: 'A secondary display (monitor/TV) and a smartphone with transfer cables.',
            order: 2,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'Use a USB cable to connect your smartphone to your computer. Once plugged in, unlock your phone screen. You will likely see a prompt asking "Allow access to device data?" or an option to select a USB mode. Choose "Allow", "File Transfer", or "MTP". Then, open File Explorer (Win + E) or Finder (macOS) and locate the newly mounted device in the sidebar.',
                  expectedResult: 'The operating system mounts the device, showing its internal storage folder structure.',
                  question: 'Were you able to browse the internal files of your phone? Yes or No.',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'Attach an external monitor using an HDMI or DisplayPort cable.\n\nOn Windows: Press the Windows key + P together. A menu will appear on the right side. Select "Extend".\n\nOn macOS: Go to System Settings > Displays, click on your second display icon, and choose "Use as Extended display".',
                  expectedResult: 'The secondary screen activates, and you can now drag windows across from one screen to the other.',
                  question: 'What is the maximum supported resolution currently being utilized by your external display (e.g., 1920x1080)?',
                  order: 2,
                }
              ]
            }
          },
          {
            title: 'Lab 3: Performance Testing',
            objective: 'Benchmark CPU and RAM under synthetic load to observe thermal throttling and resource allocation.',
            prerequisites: 'Administrative access to terminal or command prompt.',
            order: 3,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'To retrieve your CPU brand string via the command line:\n\nOn Windows: Press Win + R, type "cmd", and press Enter. Type the command exactly as shown: `wmic cpu get name` and press Enter.\n\nOn macOS: Press Cmd + Space, type "Terminal", and press Enter. Run the command: `sysctl -n machdep.cpu.brand_string`.',
                  commands: '# Windows\nwmic cpu get name\n\n# macOS\nsysctl -n machdep.cpu.brand_string',
                  expectedResult: 'The terminal outputs the full hardware name of your processor without opening any GUIs.',
                  question: 'Copy and paste the raw CPU brand string output from your terminal.',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'We will now create an artificial CPU load (stress test) using an infinite loop. Keep your Task Manager or Activity Monitor open so you can watch what happens.\n\nOn Windows: Open PowerShell (Win + X, select Terminal or Windows PowerShell) and type `while($true){}` and hit Enter.\n\nOn macOS: In Terminal, type `yes > /dev/null` and press Enter.\n\nWait 30 seconds, observe the CPU spike. To stop the test, click inside the terminal and press Ctrl + C.',
                  commands: '# Windows PowerShell\nwhile($true){}\n\n# macOS/Linux Terminal\nyes > /dev/null\n\n# Stop command\nCtrl + C',
                  expectedResult: 'CPU utilization for at least one logical processor core spikes to 100%. Cooling fans may ramp up noticeably.',
                  order: 2,
                }
              ]
            }
          }
        ]
      }
    }
  })

  // Module 2
  await prisma.module.create({
    data: {
      title: 'Module 2: Troubleshooting & Networks',
      description: 'Learn structural troubleshooting methodology and build simple local area networks.',
      order: 2,
      labs: {
        create: [
          {
            title: 'Lab 4: Troubleshooting Simulation',
            objective: 'Simulate common system failures (like network loss or frozen apps) and practice resolution steps.',
            prerequisites: 'A working internet connection.',
            order: 1,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'Disable your network adapter to simulate an outage.\n\nOn Windows: Click the Network/Wi-Fi icon in the bottom-right taskbar and click the Wi-Fi button to turn it off.\nOn macOS: Click the Wi-Fi icon in the top right menu bar and toggle it off.\n\nNow open your terminal/command prompt and attempt to ping an external server by typing `ping 8.8.8.8`.',
                  commands: 'ping 8.8.8.8',
                  expectedResult: 'The terminal returns "Request timed out", "General failure", or "Network is unreachable".',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'Re-enable your Wi-Fi using the same menu. Wait 10 seconds for it to reconnect.\n\nIn your terminal, run `ping 8.8.8.8` again. (On Windows, it stops after 4 pings. On macOS, you will need to press Ctrl + C to stop it).',
                  commands: 'ping 8.8.8.8',
                  expectedResult: 'Ping returns replies with latency times in milliseconds (e.g., time=14ms), proving Layer 3 connectivity is restored.',
                  question: 'What was the average latency (in ms) to 8.8.8.8 from your machine after reconnecting?',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'Simulate a frozen application by forcibly terminating the system UI shell.\n\nOn Windows: Press Ctrl + Shift + Esc to open Task Manager. Locate "Windows Explorer" in the list, right-click it, and select "Restart".\n\nOn macOS: Press Option + Cmd + Esc, select "Finder", and click "Relaunch".',
                  expectedResult: 'The taskbar/desktop icons will disappear momentarily and then safely reload, fixing any theoretical UI freezes.',
                  order: 3,
                }
              ]
            }
          },
          {
            title: 'Lab 5: Build Your First Network',
            objective: 'Connect two standalone machines on a local subnet and verify bidirectional connectivity.',
            prerequisites: 'Two computers (or one PC and one VM) on the same router/Wi-Fi.',
            order: 2,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'On Laptop A, you need to find the specific IP address the router assigned it.\n\nOn Windows: Open Command Prompt and type `ipconfig`. Look for the "IPv4 Address" under your active Wi-Fi or Ethernet adapter.\n\nOn macOS: Open Terminal and type `ifconfig | grep inet` or go to System Settings > Network > Wi-Fi > Details.',
                  commands: '# Windows\nipconfig\n\n# macOS\nifconfig | grep inet',
                  expectedResult: 'You locate an IP address typically looking like 192.168.x.x or 10.0.x.x, alongside a Subnet Mask and Default Gateway.',
                  question: 'What is the current IPv4 address and Default Gateway assigned to Laptop A?',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'On Laptop B, you must verify they can talk to each other. Open the Terminal or Command Prompt on Laptop B.\n\nType `ping [IP_from_Laptop_A]` and press Enter.',
                  commands: 'ping 192.168.1.X',
                  expectedResult: 'Both machines successfully exchange ICMP echo request/replies, proving they are logically connected on the local area network.',
                  order: 2,
                }
              ]
            }
          },
          {
            title: 'Lab 6: Create Your Own WLAN Access Point',
            objective: 'Transform your computer into a wireless hotspot, routing traffic for other devices.',
            prerequisites: 'A laptop with a Wi-Fi card capable of hosting ad-hoc networks.',
            order: 3,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'We will use your laptop\'s wireless card to broadcast its own network.\n\nOn Windows: Press Win + I to open Settings. Go to "Network & internet" > "Mobile hotspot". Toggle "Share my internet connection" to ON. Click "Properties" or "Edit" to view the network name (SSID) and password.',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'Take your smartphone or a secondary laptop. Open its Wi-Fi settings, search for the SSID you just created, and connect using the password.',
                  expectedResult: 'The smartphone authenticates and receives an IP address securely from the laptop\'s internal DHCP service.',
                  question: 'Under the Mobile Hotspot properties, what network band (e.g. 2.4 GHz, 5 GHz, or Any available) is your hotspot broadcasting on?',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'On the smartphone, open a web browser and load any new website (like `example.com`).',
                  expectedResult: 'The website loads. Your laptop is now acting as a router, successfully sharing its internet connection via Network Address Translation (NAT) with the wireless client.',
                  order: 3,
                }
              ]
            }
          }
        ]
      }
    }
  })

  // Module 3
  await prisma.module.create({
    data: {
      title: 'Module 3: IP and Services',
      description: 'Deep dive into IPv4 addressing, subnet masking, Domain Name Systems (DNS), and fundamental file sharing protocols like SMB/NFS.',
      order: 3,
      labs: {
        create: [
          {
            title: 'Lab 7: Static IP Configuration',
            objective: 'Manually configure IPv4 addresses to bypass DHCP, and observe what happens when misconfigured.',
            prerequisites: 'Administrator rights to change network adapter settings.',
            order: 1,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'On Windows: Press Win + R, type `ncpa.cpl` and hit Enter to open Network Connections. Right-click your active adapter (e.g. Wi-Fi) > Properties. Select "Internet Protocol Version 4 (TCP/IPv4)" and click Properties. Select "Use the following IP address".\n\nSet IP address: 192.168.10.10\nSet Subnet mask: 255.255.255.0\nLeave Default gateway blank for now. Click OK.',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'On Laptop B (or a second device/VM), follow the exact same steps but set the IP address to 192.168.10.11 with the same 255.255.255.0 subnet mask. Ensure both are disconnected from the main router to avoid conflicts.',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'Open Command Prompt on Laptop A and type `ping 192.168.10.11`.',
                  commands: 'ping 192.168.10.11',
                  expectedResult: 'Successful replies, meaning static IP routing is functional within the bare subnet.',
                  order: 3,
                },
                {
                  stepNumber: 4,
                  description: 'Now, go back into the IPv4 settings on Laptop B and change its IP to 192.168.20.11 (leaving the mask at 255.255.255.0). Try to ping it again from Laptop A.\n\nIMPORTANT: When finished, go back into adapter properties and change both machines back to "Obtain an IP address automatically".',
                  expectedResult: 'Ping fails because they are now on entirely different logical networks and don\'t have a gateway router to pass data between the .10 and .20 networks.',
                  question: 'Why exactly did the ping fail on the 192.168.20.0 subnet? Explain how the subnet mask dictates the boundary of the local broadcast domain.',
                  order: 4,
                }
              ]
            }
          },
          {
            title: 'Lab 8: DNS & Connectivity Testing',
            objective: 'Use DNS query tools to resolve hostnames to IP addresses and switch upstream DNS providers.',
            prerequisites: 'Internet access.',
            order: 2,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'Domain Name System (DNS) translates human-readable URLs to IP addresses. Let\'s watch it work.\n\nOpen Terminal/Command Prompt. On Windows type `nslookup google.com`. On macOS type `dig google.com +short`. Press Enter.',
                  commands: '# Windows\nnslookup google.com\n\n# macOS/Linux\ndig google.com +short',
                  expectedResult: 'The command returns one or multiple public IP addresses that represent Google\'s web servers.',
                  question: 'Copy and paste the exact IP address(es) returned by your DNS query for google.com.',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'We can change who resolves DNS for us.\n\nOn Windows: Press Win + R, type `ncpa.cpl`. Right-click your adapter > Properties > IPv4 > Properties. Select "Use the following DNS server addresses". Set Preferred to 1.1.1.1 (Cloudflare) and Alternate to 8.8.8.8 (Google). Click OK.',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'When you change a DNS server, your OS might still use cached records. We must forcefully flush this cache.\n\nOn Windows: Open Command Prompt and type `ipconfig /flushdns`.\nOn macOS: Open Terminal and type `sudo dscacheutil -flushcache`.',
                  commands: '# Windows\nipconfig /flushdns\n\n# macOS\nsudo dscacheutil -flushcache',
                  expectedResult: 'The terminal explicitly confirms that the DNS resolver cache was successfully flushed.',
                  order: 3,
                }
              ]
            }
          },
          {
            title: 'Lab 9: File Sharing (Client–Server)',
            objective: 'Implement the Server Message Block (SMB) protocol to securely share files across devices.',
            prerequisites: 'Two computers on the same network.',
            order: 3,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'To turn one PC into a basic file server:\n\nOn a Windows machine, create a new folder on your Desktop named "Shared_Lab". Right-click the folder > Properties > navigate to the "Sharing" tab > click "Advanced Sharing". Check the box "Share this folder". Click "Permissions" and verify that the group "Everyone" has "Read" checked. Click OK.',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'Find the IP address of the Windows machine (using `ipconfig`). Now, from your secondary computer, connect to it.\n\nOn Windows: Open File Explorer, click the top address bar and type `\\[Server_IP_Address]\\Shared_Lab`.\nOn macOS: Open Finder, click "Go" in the top menu > "Connect to Server", and type `smb://[Server_IP_Address]/Shared_Lab`.',
                  commands: '# Windows Explorer\n\\\\192.168.1.50\\Shared_Lab\n\n# macOS Finder > Connect to Server\nsmb://192.168.1.50/Shared_Lab',
                  expectedResult: 'You are prompted for network credentials. Enter the username and password of the account that exists on the server machine.',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'Try to drag a new test document into the shared folder window from the client machine.',
                  expectedResult: 'Depending on if you allowed "Full Control" or just "Read" in step 1, the file transfer will successfully copy or it will deny you permission.',
                  question: 'Does your shared folder only allow "Read" access, or does it also permit "Write" modifications based on the permissions you configured?',
                  order: 3,
                }
              ]
            }
          }
        ]
      }
    }
  })

  // Module 4
  await prisma.module.create({
    data: {
      title: 'Module 4: Virtualization & Multi-Device',
      description: 'Host multiple operating systems on a single physical host using hypervisors, and understand complex network topologies.',
      order: 4,
      labs: {
        create: [
          {
            title: 'Lab 10: Virtual Machines',
            objective: 'Deploy a Type-2 hypervisor to create an isolated Ubuntu Linux guest machine.',
            prerequisites: 'VirtualBox installed on your PC. Downloaded Ubuntu Desktop ISO.',
            order: 1,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'Open VirtualBox and click the "New" button. Name the VM "Ubuntu_Lab". Select "Linux" and "Ubuntu (64-bit)" as the type. Allocate at least 2048 MB (2GB) of RAM (Base Memory). Click Next, choose "Create a virtual hard disk now", select VDI, dynamically allocated, and size it to 20GB. Finish the wizard.',
                  question: 'What is the default virtual disk format used by VirtualBox (e.g., VDI, VMDK)?',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'By default, VMs are walled off inside a NAT network. We want the VM to appear as a physical PC on your router. \n\nClick the VM, click "Settings", navigate to "Network". By Adapter 1, change "Attached to" from "NAT" to "Bridged Adapter". Select your active Wi-Fi/Ethernet card from the Name dropdown.',
                  expectedResult: 'The VM will bypass VirtualBox\'s internal router and directly ask your home router for its own IP address.',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'Click "Start" to boot the VM. Follow prompts to select your downloaded Ubuntu ISO. Once the Ubuntu desktop loads, press Ctrl + Alt + T to open a terminal. Type `ip a` to check its IP address, and `ping 8.8.8.8` to test the internet connection.',
                  commands: 'ip a\nping 8.8.8.8',
                  expectedResult: 'The VM shows an IP address in your home subnet and successfully reaches the internet.',
                  order: 3,
                }
              ]
            }
          },
          {
            title: 'Lab 11: Multi-Device Network Mapping',
            objective: 'Map out the devices on your local network to understand the broadcast domain architecture.',
            prerequisites: 'A device connected to your home network.',
            order: 2,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'Computers maintain a temporary map of IP addresses to physical MAC hardware addresses. Let\'s view it.\n\nOpen a terminal or command prompt and type `arp -a`.',
                  commands: 'arp -a',
                  expectedResult: 'The terminal lists multiple rows containing an IP address (like 192.168.1.1) matched with a physical 12-character MAC address.',
                  question: 'Identify the IP and MAC address of your default router (gateway) from the ARP list. What is it?',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'To see a graphical view, log in to your home router\'s web dashboard. Open your web browser and type your router\'s IP (usually 192.168.1.1 or 10.0.0.1). Navigate to the "Attached Devices" or "DHCP Leases" table.',
                  expectedResult: 'You should see a list identifying your phone, smart TV, consoles, and laptops.',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: '(Optional extension): Download "Nmap" on your PC or advanced apps like "Fing" on your smartphone to sweep the entire subnet. Run `nmap -sn 192.168.1.0/24` (replace with your subnet).',
                  commands: 'nmap -sn 192.168.1.0/24',
                  expectedResult: 'The scanner forcefully queries all 254 possible addresses, discovering all live hosts on the local network.',
                  question: 'How many active "live hosts" did the scanner report on the subnet?',
                  order: 3,
                }
              ]
            }
          }
        ]
      }
    }
  })

  // Module 5
  await prisma.module.create({
    data: {
      title: 'Module 5: Users & Permissions',
      description: 'Implement Principle of Least Privilege, secure files using OS-level permissions, and understand software firewalls.',
      order: 5,
      labs: {
        create: [
          {
            title: 'Lab 12: User Accounts & Permissions',
            objective: 'Create restricted user accounts and apply strict file access control lists (ACL).',
            prerequisites: 'Admin access to Windows or Linux.',
            order: 1,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'On Windows: Press Win + R, type `compmgmt.msc` and hit Enter to open Computer Management. On the left pane, expand "Local Users and Groups" > click "Users". Right-click the empty space in the middle pane > "New User...". Name the user "guestlab", assign a password, uncheck "User must change password...", and click "Create". Do NOT add this user to the Administrators group.',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'On your C: drive, create a folder called "TopSecret". Right-click it > Properties > "Security" tab. Click "Edit..." to change permissions. Highlight the "Users" group, and in the permissions box below, place checkmarks in the "Deny" column for Full Control, Modify, Read, and Write. Click Apply.',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'Click the Start menu, click your User Profile picture, and log out. Log back in using the newly created "guestlab" account. Navigate to the C: drive and double-click the "TopSecret" folder.',
                  expectedResult: 'Windows throws a hard "Access Denied" error detailing insufficient permissions, proving the ACL worked.',
                  order: 3,
                },
                {
                  stepNumber: 4,
                  description: 'Let\'s replicate this concept on Linux. Open an Ubuntu VM terminal. Type `sudo adduser testuser2` and follow prompts. Next, type `touch /home/shared_secret.txt` to create a file. Finally, apply strict POSIX permissions by typing `sudo chmod 700 /home/shared_secret.txt`.',
                  commands: 'sudo adduser testuser2\ntouch /home/shared_secret.txt\nsudo chmod 700 /home/shared_secret.txt',
                  expectedResult: 'Only the creator (root) can read or modify the file.',
                  question: 'In standard Linux octal permissions (chmod 700), what exactly does the number "7" authorize the owner to do?',
                  order: 4,
                }
              ]
            }
          },
          {
            title: 'Lab 13: Firewall & Networking Security',
            objective: 'Configure Host-Based Firewalls to block specific inbound and outbound connections.',
            prerequisites: 'Windows OS.',
            order: 2,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'On Windows: Press Win key, type "Windows Defender Firewall with Advanced Security" and press Enter. On the left pane, click "Inbound Rules". On the far right pane, click "New Rule...". Select "Port", click Next. Select "TCP" and type "80" in the specific local ports box. Click Next. Select "Block the connection". Click Next twice, name it "Block HTTP Lab", and click Finish.',
                  question: 'By default, before you added this rule, does your host firewall block or allow all incoming connections that were not explicitly initiated by you?',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'To test this: On your PC, temporarily run a simple python web server: Open CMD, type `python -m http.server 80`. From a DIFFERENT device on the network (like your phone), open a browser and type your PC\'s IP address (e.g. `http://192.168.1.50`).',
                  expectedResult: 'The browser will time out loading the page because the firewall immediately drops the inbound SYN packet on port 80.',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'Go back to Windows Defender Firewall. Find the "Block HTTP Lab" rule in your Inbound list, right-click it, and select "Disable Rule" (or "Delete"). Try loading the page on your phone again.',
                  expectedResult: 'The web page successfully loads, demonstrating real-time mastery over permitting or denying traffic.',
                  order: 3,
                }
              ]
            }
          },
          {
            title: 'Lab 14: Command Line Mastery',
            objective: 'Perform advanced queries of operating system state strictly via the terminal interface.',
            prerequisites: 'Terminal access.',
            order: 3,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'To trace the exact routing path and identify where network latency occurs, open your terminal.\n\nOn Windows: type `tracert 1.1.1.1` and press Enter.\nOn macOS/Linux: type `traceroute 1.1.1.1` and press Enter.\n\nWatch as each router hop is discovered one by one.',
                  commands: '# Windows\ntracert 1.1.1.1\n\n# macOS/Linux\ntraceroute 1.1.1.1',
                  expectedResult: 'Outputs a progressively longer list of router IP addresses your traffic traverses across the global internet.',
                  question: 'Look at the very first hop in your traceroute trace. What is the IP address? Does that IP address match your home router?',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'To identify what network services are currently running on your machine, you must check listening ports.\n\nOn Windows: Open CMD as Administrator and type `netstat -ano | findstr LISTENING`. This filters the output purely for open ports.\nOn macOS/Linux: Open Terminal and type `sudo netstat -tuln` (or `lsof -PiTCP -sTCP:LISTEN`).',
                  commands: '# Windows\nnetstat -ano | findstr LISTENING\n\n# Linux\nsudo netstat -tuln',
                  expectedResult: 'You see a list of IP addresses followed by a colon and a port number (e.g., 0.0.0.0:135), alongside a Process ID (PID).',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'On Windows, you can identify which application holds that port by checking the task list. Type `tasklist | findstr [PID]`, replacing [PID] with one of the numbers from your netstat output in the previous step.',
                  commands: 'tasklist | findstr 1234',
                  expectedResult: 'Returns the exact application executable name (e.g., svchost.exe) bound to the PID.',
                  order: 3,
                }
              ]
            }
          }
        ]
      }
    }
  })

  // Module 6
  await prisma.module.create({
    data: {
      title: 'Module 6: Remote Access & Security',
      description: 'Connect securely to remote infrastructure via graphical (RDP) and command-line protocols (SSH).',
      order: 6,
      labs: {
        create: [
          {
            title: 'Lab 15: Remote Desktop Setup',
            objective: 'Enable and securely connect to a Windows machine over the network via RDP.',
            prerequisites: 'Windows Pro or Enterprise edition for the host being connected to (Windows Home cannot host RDP).',
            order: 1,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'On the target Windows laptop (Must be Pro version): Press Win + I -> System -> Remote Desktop. Toggle "Enable Remote Desktop" to "On". Verify that your user account is listed under "Remote Desktop users". Ensure you know the machine\'s IP address by checking `ipconfig`.',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'From a secondary device (Mac or Windows): Open the "Remote Desktop Connection" client app (download from App Store if on Mac). Enter the target PC\'s IP address in the "Computer:" box and click Connect. Enter the target PC\'s Windows username and password when prompted.',
                  expectedResult: 'The entire Windows desktop environment from the target machine is streamed flawlessly to your client device.',
                  question: 'What is the default TCP port number used by Remote Desktop Protocol (RDP)?',
                  order: 2,
                }
              ]
            }
          },
          {
            title: 'Lab 16: SSH into Linux VM',
            objective: 'Install OpenSSH server and connect to your Linux VM securely from a different OS.',
            prerequisites: 'Ubuntu VM from Lab 10 running.',
            order: 2,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'On your Ubuntu VM, open the terminal. Update your packages and install the SSH daemon by typing `sudo apt update && sudo apt install openssh-server -y`. Once installed, ensure the firewall permits SSH traffic by typing `sudo ufw allow ssh`.',
                  commands: 'sudo apt update && sudo apt install openssh-server -y\nsudo systemctl status ssh\nsudo ufw allow ssh',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'Find your Ubuntu VM\'s IP address by typing `ip a`. Now, from your main host OS (Windows Command Prompt or Mac Terminal), type `ssh username@[Ubuntu_IP_Address]` (replacing username and IP with your VM\'s details) and press Enter. Type "yes" to accept the key fingerprint, then enter the VM user password.',
                  commands: 'ssh your_vm_user@192.168.1.X',
                  expectedResult: 'Your local terminal magically transforms into a remote shell operating directly inside the Linux VM.',
                  question: 'What is the default TCP port utilized by the Secure Shell (SSH) protocol?',
                  order: 2,
                }
              ]
            }
          },
          {
            title: 'Lab 17: Generating SSH Keys',
            objective: 'Implement asymmetric key-pair cryptography for passwordless, highly secure remote access.',
            prerequisites: 'Completed Lab 16.',
            order: 3,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'Using passwords for SSH is insecure. Let\'s create cryptographic keys. On your *host* machine (Windows/Mac terminal), type `ssh-keygen -t ed25519 -C "lab_key"` and press Enter continuously to accept defaults without a passphrase.',
                  commands: 'ssh-keygen -t ed25519 -C "lab_key"',
                  expectedResult: 'Two highly secure text files are created in your ~/.ssh/ directory: a private key, and a public key (.pub).',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'Copy your public key to the Ubuntu server so it recognizes you.\n\nOn macOS/Linux: type `ssh-copy-id username@[Ubuntu_IP_Address]`.\nOn Windows: type `type %USERPROFILE%\\.ssh\\id_ed25519.pub | ssh username@[Ubuntu_IP_Address] "cat >> .ssh/authorized_keys"`.',
                  commands: 'ssh-copy-id your_vm_user@192.168.1.X',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'Now, type the SSH command again: `ssh username@[Ubuntu_IP_Address]`.',
                  commands: 'ssh your_vm_user@192.168.1.X',
                  expectedResult: 'You gain instant shell access automatically via cryptographic math, completely bypassing the password prompt.',
                  order: 3,
                }
              ]
            }
          }
        ]
      }
    }
  })

  // Module 7
  await prisma.module.create({
    data: {
      title: 'Module 7: OS Installation & Troubleshooting Capstone',
      description: 'The final capstone integrating bare-metal/virtual OS provisioning and robust scenario troubleshooting.',
      order: 7,
      labs: {
        create: [
          {
            title: 'Lab 18: Headless Server Deployment',
            objective: 'Install a headless (no GUI) Linux server distribution to conserve resources and focus purely on command-line administration.',
            prerequisites: 'VirtualBox and Ubuntu Server ISO.',
            order: 1,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'Download the "Ubuntu Server" ISO from ubuntu.com. Create a new VM in VirtualBox. Name it "Headless Server". Since it has no graphical interface, allocate only 1024 MB (1GB) RAM and 1 CPU core. Attach the ISO and start the VM.',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'Navigate the text-based installer using Arrow Keys and Enter. Make sure that when you see the "SSH Setup" page, you explicitly check the box (Spacebar) to install the "OpenSSH server". Finish installation and reboot.',
                  question: 'Why is it more secure and efficient to run an enterprise server headlessly rather than installing a full Windows or Linux desktop UI wrapper?',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'Once booted, log into the server from its terminal window. Type `top` and press Enter to see live process allocations.',
                  commands: 'top',
                  expectedResult: 'Observe that the total memory consumption of the entire operating system is typically under 300MB at idle.',
                  order: 3,
                }
              ]
            }
          },
          {
            title: 'Lab 19: Full Troubleshooting Scenario',
            objective: 'Simulate a multi-layered failure ranging from DHCP to DNS, diagnosing logically from Layer 1 up to Layer 7.',
            prerequisites: 'A willingness to break network settings.',
            order: 2,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'Scenario Breakdown Setup: Open your Network Adapter settings and manually configure a completely bogus DNS server (e.g., 10.0.0.99), AND open CMD and run `ipconfig /release` to drop your IP address lease without renewing it. Your internet is now thoroughly broken.',
                  commands: '# Windows\nipconfig /release',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'Methodically perform system checks moving up the OSI model: Layer 1 check: Is Wi-Fi physically connected? Layer 3 check: Run `ipconfig`; do you have an IP address? No? Ask DHCP for one by running `ipconfig /renew`. Layer 3 checkout 2: ping 8.8.8.8. It works! Layer 7 check: Attempt `ping google.com`. It fails!',
                  commands: 'ipconfig /renew\nping 8.8.8.8\nping google.com',
                  expectedResult: 'You logically isolated the problem down to a DNS failure without skipping steps.',
                  question: 'Based on the OSI model, at what layer does the DNS component predominantly operate?',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'Apply the final fix: Go back into your Network Adapter settings, change DNS back to "Obtain DNS server address automatically". Run `ipconfig /flushdns`, then load a website in your browser.',
                  expectedResult: 'Connectivity is fully restored utilizing structured isolation methodology.',
                  order: 3,
                }
              ]
            }
          },
          {
            title: 'Lab 20: Build Mini IT Environment',
            objective: 'Final Project: Integrate services across multiple nodes. Run a web server on the Linux VM securely accessed from the host.',
            prerequisites: 'Ubuntu VM (Desktop or Headless), basic Linux CLI knowledge.',
            order: 3,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'SSH into your Linux VM (from Lab 16/18). Let\'s install a production-grade web server software. Type `sudo apt update` and hit Enter, then type `sudo apt install nginx -y` and hit Enter. Finally, ensure it runs automatically by typing `sudo systemctl enable --now nginx`.',
                  commands: 'sudo apt update && sudo apt install nginx -y\nsudo systemctl enable --now nginx',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'Nginx serves a default webpage out of the `/var/www/html/` directory. Let\'s modify it using a terminal text editor. Type `sudo nano /var/www/html/index.nginx-debian.html`. Use arrow keys to find the "<title>" tag and "<h1>" tag. Delete the placeholder text and type "Welcome to my Home Lab Server". Press Ctrl + O, Enter, then Ctrl + X to save and exit.',
                  commands: 'sudo nano /var/www/html/index.nginx-debian.html',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'Retrieve the VM\'s IP address using `ip a`. Switch over to your host laptop\'s web browser (like Chrome/Edge). In the top URL bar, type the VM\'s IP address (e.g. `http://192.168.1.50`) and press Enter.',
                  expectedResult: 'The browser makes an HTTP GET request to port 80 of the VM, and Nginx serves back your custom HTML "Welcome to my Home Lab Server" webpage!',
                  question: 'Congratulations! What standard HTTP response code (e.g. 200, 404, 503) does a web server issue indicating the successful retrieval of a page?',
                  order: 3,
                }
              ]
            }
          }
        ]
      }
    }
  })

  console.log('Successfully seeded tightly guided real-world task curriculum with exact keystrokes!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
