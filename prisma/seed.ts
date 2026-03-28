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
      description: 'Identify and explain the physical components, ports, and connectors of a personal computer. Aligned with CompTIA A+ Core 1 (220-1201) Exam Objectives 3.1 and 3.2: Compare/contrast display components and summarize basic cable types and their features. You will also apply the CompTIA troubleshooting methodology to real hardware scenarios.',
      order: 1,
      labs: {
        create: [
          {
            title: 'Lab 1: Hardware Identification & Port Recognition',
            objective: 'Identify and differentiate external I/O ports, connectors, and internal components on a PC. Aligned with CompTIA A+ Core 1 Exam Objective 3.2: Summarize basic cable types and connectors, features, and purposes.',
            prerequisites: 'A laptop or desktop PC with multiple ports. No special software required.',
            order: 1,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'According to the CompTIA A+ Core 1 textbook (Module 2, Lesson 2A), a hardware port is the external connection point for a bus interface, allowing data transfer to and from devices. The connector is the part of a peripheral cable that fits into a matching port.\n\nPhysically inspect the rear and sides of your computer. Identify each of the following standard I/O ports by shape and function:\n• USB Type-A — rectangular, flat connector (most common for peripherals)\n• USB Type-C — small, oval, reversible connector (modern standard)\n• HDMI — trapezoid-shaped 19-pin video/audio port\n• DisplayPort — similar to HDMI but with one angled corner\n• RJ-45 — rectangular 8-pin Ethernet network jack\n• 3.5mm Audio — small circular port (green = output, pink = microphone)\n• USB 3.0 ports are often color-coded blue to distinguish them from USB 2.0 (black/white).\n\nIMPORTANT: Never touch internal components without first grounding yourself. Electrostatic discharge (ESD) can permanently damage chips.',
                  expectedResult: 'You can positively identify and describe every port visible on your machine by name, shape, and its primary function.',
                  question: 'List every I/O port type you found on your device, how many of each, and what each port is primarily used for (e.g., "2x USB Type-A — used for keyboards, mice, flash drives").',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'Now check your live hardware utilization in the system performance monitor. This is equivalent to what IT technicians use daily to diagnose sluggish systems.\n\nOn Windows: Press Ctrl + Shift + Esc → click "More details" if needed → click the "Performance" tab. You will see separate graphs for CPU, Memory, Disk, and Network.\n\nOn macOS: Cmd + Space → type "Activity Monitor" → press Enter. Click the "CPU", "Memory", and "Disk" tabs at the top.\n\nObserve each metric for 30 seconds and note the baseline readings.',
                  expectedResult: 'Live, animated graphs appear for CPU utilization (%), Memory usage (GB used/total), Disk read/write speed (MB/s), and Network send/receive (Mbps).',
                  question: 'What are the current baseline utilization percentages for CPU and Memory? What is your total installed RAM in GB, and how many CPU logical processors are listed?',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'Retrieve precise hardware specifications from your operating system — this is a critical IT support skill for compatibility checks and warranty lookups.\n\nOn Windows: Press Win + R → type "msinfo32" → press Enter. Locate:\n  - "Processor" row (shows CPU make, model, speed in GHz, and core count)\n  - "Installed Physical Memory (RAM)" row\n  - "System Model" row\n\nOn macOS: Click Apple menu (top-left) → "About This Mac" → "More Info" for full specs.\n\nThe textbook notes that transfer rates are expressed in bits per second (Mbps, Gbps) using a lowercase "b", while storage is measured in bytes using an uppercase "B" (MB, GB). This distinction matters when reading specs.',
                  expectedResult: 'You have the full processor brand string, installed RAM amount, and system model identifier from the OS — without opening any graphical hardware utility.',
                  question: 'What is your exact processor model/brand string, total installed RAM, and system model name as shown in msinfo32 or About This Mac?',
                  order: 3,
                }
              ]
            }
          },
          {
            title: 'Lab 2: Peripheral Device Connection & Driver Behavior',
            objective: 'Connect external peripherals and observe how the operating system detects, installs drivers, and manages new devices. Covers CompTIA A+ 220-1201 Objective 3.1 (display components) and 3.2 (cable types/connectors).',
            prerequisites: 'A smartphone with a USB data cable. Optionally, a secondary monitor or TV with HDMI.',
            order: 2,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'The CompTIA A+ textbook classifies USB as a universal bus interface supporting many device types through one standardized port. When you connect a phone, the OS negotiates a USB connection mode.\n\nConnect your smartphone to your computer via USB cable. Unlock your phone — you should see a USB mode prompt:\n• Charging only — no data transfer\n• MTP (Media Transfer Protocol) — access music, photos, files (used on Android)\n• PTP (Picture Transfer Protocol) — camera photos only (used for imaging apps)\n• File Transfer — full file system access\n\nSelect "File Transfer" or "MTP". Then open File Explorer (Win + E) or Finder on macOS and locate your device in the left sidebar.',
                  expectedResult: 'The OS mounts the device and makes its internal storage folder structure accessible through the native file manager. Windows may briefly show a device driver installation notification in the taskbar.',
                  question: 'Which USB connection mode did you select on your phone? Were you prompted by Windows/macOS to install a driver? Were you able to browse your phone\'s internal folders?',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'According to the CompTIA A+ Core 1 textbook (Objective 3.1), monitors and displays operate at a native resolution — the exact pixel count the panel is designed for. Running below native resolution causes visible blurriness. Refresh rate (measured in Hz) determines how many frames per second the display updates.\n\nAttach an external monitor or TV using an HDMI or DisplayPort cable.\n\nOn Windows: Press Win + P → select "Extend" to use the monitor as a second screen. Then right-click your desktop → "Display settings" → click the second display → scroll down to "Display resolution" and "Refresh rate".\n\nOn macOS: Apple menu → System Settings → Displays → select the external display to check its resolution and refresh rate settings.\n\nFor HDMI: if audio does not automatically route to the TV, right-click the speaker icon in the taskbar → "Sound settings" → set the output device to your display.',
                  expectedResult: 'The external display activates as an extended screen. The resolution and refresh rate are displayed in the OS display settings panel for both monitors independently.',
                  question: 'What is the native resolution and refresh rate of your external display? Is it running at its native resolution? What video interface (HDMI, DisplayPort, etc.) did you use?',
                  order: 2,
                }
              ]
            }
          },
          {
            title: 'Lab 3: CPU Performance & Thermal Analysis',
            objective: 'Benchmark CPU under synthetic load, observe thermal throttling behavior, and use BIOS/UEFI and OS tools to monitor temperature. Aligned with CompTIA A+ Core 1 Module 4: Troubleshooting PC Hardware, covering fan control and temperature monitoring.',
            prerequisites: 'Administrative access to terminal or command prompt. Task Manager or Activity Monitor open.',
            order: 3,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'First, identify your exact CPU from the command line — a key IT technician skill for asset inventory and support tickets.\n\nOn Windows: Press Win + R → type "cmd" → press Enter. Run:\n  wmic cpu get name,NumberOfCores,NumberOfLogicalProcessors,MaxClockSpeed\n\nOn macOS: Open Terminal and run:\n  sysctl -n machdep.cpu.brand_string\n  sysctl -n hw.physicalcpu hw.logicalcpu\n\nThe CompTIA A+ textbook notes that processors have both physical cores and logical processors (via Hyper-Threading). A quad-core CPU with Hyper-Threading appears as 8 logical processors in Task Manager.',
                  commands: '# Windows\nwmic cpu get name,NumberOfCores,NumberOfLogicalProcessors,MaxClockSpeed\n\n# macOS\nsysctl -n machdep.cpu.brand_string\nsysctl -n hw.physicalcpu hw.logicalcpu',
                  expectedResult: 'The terminal outputs the full CPU brand name, physical core count, logical processor count, and maximum clock speed in MHz.',
                  question: 'What is the full CPU brand string, how many physical cores does it have, how many logical processors, and what is the base clock speed in GHz?',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'Now perform a synthetic CPU stress test and observe thermal behavior. The CompTIA A+ Core 1 textbook (Module 4) explains that modern CPUs use thermal throttling — automatically reducing clock speed when temperature sensors reach a threshold — to prevent hardware damage.\n\nKeep Task Manager (Performance tab) or Activity Monitor (CPU tab) visible BEFORE running the test.\n\nOn Windows: Open PowerShell → type the following and press Enter:\n  while($true){}\n\nOn macOS/Linux: Open Terminal → type:\n  yes > /dev/null\n\nObserve CPU usage for 30-45 seconds. Watch for:\n• CPU utilization jumping to 100% on one core\n• Overall CPU % rising\n• Fan noise increasing (CPU fan spinning faster)\n• CPU temperature rising (if visible in BIOS or tools like HWMonitor)\n\nStop the test by clicking the terminal and pressing Ctrl + C.',
                  commands: '# Windows PowerShell (single-core stress)\nwhile($true){}\n\n# macOS/Linux Terminal\nyes > /dev/null\n\n# Stop the stress test\nCtrl + C',
                  expectedResult: 'CPU utilization for at least one logical processor core spikes to 100%. The system fan may ramp up audibly. After stopping with Ctrl+C, CPU usage returns to baseline within seconds.',
                  question: 'What peak CPU utilization percentage did you observe during the stress test? Did you hear or notice any change in fan speed? How quickly did CPU usage return to idle after pressing Ctrl+C?',
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
      description: 'Apply the CompTIA 6-step troubleshooting methodology to real-world failures and build functional local area networks. Aligned with CompTIA A+ Core 1 (220-1201) Module 1 (troubleshooting process) and Module 6 (network addressing, DHCP, TCP/IP), and Core 2 (220-1202) Module 9 (SOHO wireless security).',
      order: 2,
      labs: {
        create: [
          {
            title: 'Lab 4: Applying the CompTIA Troubleshooting Methodology',
            objective: 'Practice the official CompTIA 6-step troubleshooting process by simulating and resolving a real network failure. Aligned with CompTIA A+ Core 1 & Core 2 Module 1 Objective: Explain the importance of using proper documentation and the 6-step troubleshooting process.',
            prerequisites: 'A working internet connection. Terminal/command prompt access.',
            order: 1,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'The CompTIA A+ Core 1 and Core 2 textbooks both describe the same 6-step troubleshooting methodology used by IT professionals worldwide:\n\n1. Identify the problem — Gather info, question the user, check for recent changes\n2. Establish a theory of probable cause — Work from most to least likely causes\n3. Test the theory — Confirm or disprove your hypothesis\n4. Establish a plan of action — Determine fix steps, considering business impact\n5. Implement the solution — Apply the fix or escalate if needed\n6. Verify full functionality & document — Confirm fix works, record findings\n\nNow let\'s walk through this live. STEP 1: Identify the problem.\n\nDisable your Wi-Fi adapter to simulate an outage:\n• Windows: Click the Wi-Fi icon in the taskbar → toggle Wi-Fi off\n• macOS: Click the Wi-Fi icon in the menu bar → toggle off\n\nDocument the symptom: open Terminal and run `ping 8.8.8.8` to record the failure.',
                  commands: 'ping 8.8.8.8',
                  expectedResult: 'The terminal returns "Request timed out", "General failure", or "Network is unreachable" — confirming network is down.',
                  question: 'Step 1 complete: What exact error message did the ping command return? Based on this symptom, what is your theory of probable cause (Step 2)?',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'STEPS 3–5: Test your theory, plan, and implement the fix.\n\nThe textbook notes: "If your theory is proven, determine the next steps to resolve the problem." Your theory is that the Wi-Fi adapter is disabled.\n\nRe-enable your Wi-Fi via the same menu. Wait up to 15 seconds for the DHCP server on your router to issue a new IP lease.\n\nSTEP 3 — Test: Run `ping 8.8.8.8` again to confirm Layer 3 IP connectivity is restored.\n\nOn Windows: the command sends 4 packets and stops automatically.\nOn macOS/Linux: press Ctrl + C after you see 4 replies.',
                  commands: 'ping 8.8.8.8',
                  expectedResult: 'Ping returns ICMP echo replies with round-trip latency in milliseconds (e.g., time=12ms), confirming Layer 3 connectivity is fully restored.',
                  question: 'What was the average round-trip latency (in ms) to 8.8.8.8 after restoring Wi-Fi? At what OSI layer does the ICMP ping protocol operate?',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'STEP 6: Verify full system functionality and document findings.\n\nThe CompTIA A+ textbook states that after fixing a problem, you must verify the entire system — not just the specific failure point — and document what happened for future reference.\n\nSimulate a separate hung-process failure (unrelated to the network). On Windows, forcibly restart the Windows Explorer shell (the UI engine):\n\n• Press Ctrl + Shift + Esc → find "Windows Explorer" → right-click → "Restart"\n\nOn macOS: Press Option + Cmd + Esc → select "Finder" → click "Relaunch"\n\nThis mimics escalating from network troubleshooting to UI/application layer (Layer 7) troubleshooting — a different category of failure.',
                  expectedResult: 'The desktop icons and taskbar briefly disappear then safely reload — the OS shell process recovers without a full reboot, confirming the fix worked.',
                  question: 'Step 6: Describe the full resolution you applied (re-enabling Wi-Fi) and the visual confirmation you observed when restarting Windows Explorer/Finder. Why is documentation of these steps important per CompTIA best practices?',
                  order: 3,
                }
              ]
            }
          },
          {
            title: 'Lab 5: Build Your First TCP/IP Network',
            objective: 'Identify DHCP-assigned IP parameters and verify bidirectional ICMP connectivity between two hosts on the same subnet. Aligned with CompTIA A+ Core 1 (220-1201) Module 6: Configuring Network Addressing — covering IPv4, subnet masks, default gateway, and DHCP.',
            prerequisites: 'Two computers or devices (or one PC + one VM) connected to the same router or Wi-Fi network.',
            order: 2,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'The CompTIA A+ Core 1 textbook (Module 6) defines four key IPv4 parameters every host must have to communicate on a network:\n\n1. IP Address — unique logical identifier for the host (e.g., 192.168.1.50)\n2. Subnet Mask — defines the local network boundary (e.g., 255.255.255.0 = /24)\n3. Default Gateway — the router\'s IP address; packets for remote networks go here\n4. DNS Server — resolves human-readable domain names to IP addresses\n\nThese are typically assigned automatically by DHCP (Dynamic Host Configuration Protocol) — a broadcast-based protocol that runs over UDP.\n\nOn Device A, retrieve all four parameters:\n• Windows: Open CMD → run `ipconfig /all`\n• macOS: Open Terminal → run `ifconfig | grep -A5 en0` or check System Settings → Network',
                  commands: '# Windows\nipconfig /all\n\n# macOS\nifconfig | grep -A5 en0\n\n# Alternative macOS\nnetwork-preferences or System Settings > Network > Wi-Fi > Details',
                  expectedResult: 'Output shows your IPv4 address (e.g., 192.168.1.x), Subnet Mask (e.g., 255.255.255.0), Default Gateway (your router\'s IP), and DNS Server address.',
                  question: 'What are all four IP parameters for Device A: IPv4 address, subnet mask, default gateway, and DNS server? Was the address obtained via DHCP or manually configured?',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'The textbook explains that for two hosts to communicate directly (without a router), they must be on the same IP network — meaning the network portion of their IP addresses must match, as defined by the subnet mask.\n\nWith a /24 (255.255.255.0) subnet mask:\n• 192.168.1.50 and 192.168.1.75 → SAME network ✓\n• 192.168.1.50 and 192.168.2.75 → DIFFERENT networks ✗\n\nOn Device B, find its IP address using the same commands. Then from Device B\'s terminal, ping Device A\'s IP:\n\n  ping [Device_A_IP]\n\nICMP (Internet Control Message Protocol) uses "echo request" and "echo reply" packets to test connectivity. A successful reply confirms Layer 3 bidirectional connectivity.',
                  commands: '# From Device B — replace with actual IP\nping 192.168.1.50\n\n# Windows stops after 4 pings automatically\n# macOS/Linux: press Ctrl+C after a few replies',
                  expectedResult: 'Device B receives ICMP echo replies from Device A with round-trip times in milliseconds, confirming both hosts are on the same /24 subnet and can communicate.',
                  question: 'What IP address does Device B have? Did the ping return successful replies? What was the average round-trip time? Are both devices in the same /24 subnet based on their IP addresses?',
                  order: 2,
                }
              ]
            }
          },
          {
            title: 'Lab 6: Configure a Wireless Access Point (SOHO Hotspot)',
            objective: 'Create a personal Wi-Fi hotspot and understand wireless standards, frequency bands, and security protocols. Aligned with CompTIA A+ Core 2 (220-1202) Module 9: Configuring SOHO Network Security — covering WPA2/WPA3, SSID, frequency bands, and DHCP.',
            prerequisites: 'A laptop with a Wi-Fi card. A secondary device (phone or laptop) to connect as a client.',
            order: 3,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'The CompTIA A+ Core 2 textbook (Module 9) covering SOHO network security explains that wireless networks operate on two main frequency bands:\n\n• 2.4 GHz — longer range, more wall penetration, but more congested (shares spectrum with microwaves, Bluetooth). Max ~600 Mbps (802.11n).\n• 5 GHz — faster speeds (up to 9.6 Gbps on 802.11ax/Wi-Fi 6), shorter range, less interference.\n\nThe textbook also defines SSID (Service Set Identifier) — the human-readable broadcast name of a wireless network. Hiding the SSID is a minor security measure but does not prevent determined attackers.\n\nCreate the hotspot:\n• Windows: Settings → Network & Internet → Mobile Hotspot → toggle ON. Click "Edit" to set SSID name and password. Note the "Network band" setting (2.4 GHz / 5 GHz / Any available).\n• macOS: System Settings → General → Sharing → enable "Internet Sharing". Share from Wi-Fi/Ethernet to Wi-Fi. Set a WPA2 password.',
                  expectedResult: 'Your computer broadcasts a new SSID visible to nearby Wi-Fi clients. The OS\'s internal DHCP server is now active to assign IPs to connecting clients.',
                  question: 'What SSID name did you configure? What frequency band is your hotspot using? What security type (WPA2, WPA3) is shown in the hotspot settings?',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'The textbook explains that WPA2 (Wi-Fi Protected Access 2) uses AES-CCMP encryption and requires a Pre-Shared Key (PSK) to authenticate clients. WPA3 (the newer standard) uses Simultaneous Authentication of Equals (SAE) which is more resistant to offline dictionary attacks.\n\nConnect your secondary device to the hotspot:\n1. On your phone/laptop, open Wi-Fi settings and scan for networks\n2. Select your hotspot SSID\n3. Enter the password you configured\n4. Wait for the client to receive an IP address from the hotspot\'s DHCP server\n\nOnce connected, on the client device open a browser and navigate to any website (e.g., example.com) to confirm internet routing is working.',
                  expectedResult: 'The client device authenticates, receives a DHCP-assigned IP in a private range (often 192.168.137.x or 172.20.x.x), and successfully browses the internet through your laptop acting as a NAT router.',
                  question: 'What IP address was assigned to your client device? Does it share the same network prefix as the hotspot gateway? Did the website load successfully, confirming NAT is working correctly?',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'The CompTIA A+ textbook explains that when the hotspot shares internet access, it uses Network Address Translation (NAT) — a technique where the router (your laptop) maps multiple private IP addresses to a single public IP. This is how all home routers work.\n\nVerify NAT is functioning by checking the client\'s "external" IP vs its private IP:\n\nOn the client device, open a browser and visit: https://whatismyipaddress.com\n\nAlso note the client\'s local IP from the hotspot settings (Windows: Mobile Hotspot shows connected devices). Compare the two addresses.\n\nOptionally, on the HOST (laptop), open CMD/Terminal and run:\n• Windows: `netsh wlan show hostednetwork` to see connected stations\n• macOS: check System Settings → Sharing to see connected clients',
                  commands: '# Windows — view hotspot client details\nnetsh wlan show hostednetwork\n\n# Check your public IP from the client browser\n# Visit: https://whatismyipaddress.com',
                  expectedResult: 'The client\'s local private IP (e.g., 192.168.137.x) is completely different from its public IP shown on whatismyipaddress.com — proving NAT is translating the private address to the host\'s public internet IP.',
                  question: 'What is the client device\'s private DHCP-assigned IP? What public IP address did whatismyipaddress.com show? Is the public IP the same as your laptop\'s internet IP, confirming NAT is operating?',
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
      title: 'Module 3: IP Addressing & Network Services',
      description: 'Deep dive into IPv4 static addressing, subnet masking, DHCP, DNS resolution, and file sharing via SMB. Aligned with CompTIA A+ Core 1 (220-1201) Module 6: Configuring Network Addressing and Internet Connections, and Core 2 (220-1202) Module 5: Supporting Windows.',
      order: 3,
      labs: {
        create: [
          {
            title: 'Lab 7: Static IPv4 Configuration & Subnet Boundary Testing',
            objective: 'Manually configure static IPv4 addresses, understand CIDR notation and subnet masks, and observe why hosts on different subnets cannot communicate without a router. Aligned with CompTIA A+ Core 1 (220-1201) Module 6 Exam Objectives.',
            prerequisites: 'Administrator rights to modify network adapter settings on Windows. Optionally a second device or VM.',
            order: 1,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'The CompTIA A+ Core 1 textbook (Module 6) explains that static IP configuration means the administrator manually sets the IP address — bypassing DHCP. This is recommended for routers, servers, and devices that need a predictable, fixed address.\n\nOn Windows, open network adapter settings:\n• Press Win + R → type `ncpa.cpl` → press Enter\n• Right-click your active adapter (Wi-Fi or Ethernet) → "Properties"\n• Double-click "Internet Protocol Version 4 (TCP/IPv4)"\n• Select "Use the following IP address"\n\nEnter these static values:\n  IP address: 192.168.10.10\n  Subnet mask: 255.255.255.0\n  Default gateway: (leave blank for now)\n  DNS servers: (leave blank)\n\nClick OK → OK to apply. Note: The /24 prefix (255.255.255.0) means the first 3 octets define the network, and the last octet (0–255) defines individual hosts on that network.',
                  expectedResult: 'The adapter now shows a static IP of 192.168.10.10/24. If no gateway is configured, the OS may show a "No Internet" warning — this is expected and correct for this exercise.',
                  question: 'Confirm the static IP was applied. In the ncpa.cpl adapter details, what IP address and subnet mask are now shown? Why is it normal to see "No Internet" when the Default Gateway field is left blank?',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'IMPORTANT: The textbook warns that when hosts use static IPs, the administrator must track allocations carefully to prevent IP conflicts — two devices claiming the same IP on a subnet.\n\nOn your second device or VM, set a static IP in the same /24 network:\n  IP address: 192.168.10.11\n  Subnet mask: 255.255.255.0\n  Default gateway: (leave blank)\n\nNow from Device A (192.168.10.10), open Command Prompt or Terminal and ping Device B:\n  ping 192.168.10.11\n\nBoth devices share the same network prefix (192.168.10.0/24), so no router is needed — they communicate directly.',
                  commands: '# From Device A\nping 192.168.10.11',
                  expectedResult: 'Successful ICMP echo replies from 192.168.10.11, proving direct Layer 2/3 communication works within the same /24 subnet without a gateway.',
                  question: 'Did the ping succeed? What were the round-trip times? Explain in your own words why two hosts with 192.168.10.x addresses can talk directly without needing a default gateway.',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'Now observe what happens when hosts are on DIFFERENT subnets with no router.\n\nThe CompTIA A+ textbook explains: "A host cannot communicate with a host on a different IP network without a router to forward packets between the two networks."\n\nChange Device B\'s IP to 192.168.20.11 (keeping mask 255.255.255.0). Device A is on the 192.168.10.0/24 network; Device B is now on 192.168.20.0/24.\n\nFrom Device A, try: ping 192.168.20.11\n\nAFTERWARD: Restore both devices back to "Obtain an IP address automatically" (DHCP) before proceeding.',
                  commands: '# From Device A — should FAIL\nping 192.168.20.11\n\n# Restore DHCP on both devices when done',
                  expectedResult: 'Ping fails with "Request timed out" or "Destination host unreachable" because Device A has no default gateway to forward packets to the 192.168.20.0/24 network.',
                  question: 'What exact error did ping return? Using the subnet mask 255.255.255.0, explain precisely why 192.168.10.10 and 192.168.20.11 are on separate networks. What network device would be required to route between them?',
                  order: 3,
                }
              ]
            }
          },
          {
            title: 'Lab 8: DNS Resolution & Server Configuration',
            objective: 'Use DNS lookup tools to trace the name resolution chain, switch upstream DNS providers, and flush the resolver cache. Aligned with CompTIA A+ Core 1 (220-1201) Module 6: DNS configuration, TCP port 53.',
            prerequisites: 'Active internet connection.',
            order: 2,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'The CompTIA A+ Core 1 textbook (Module 6) defines DNS (Domain Name System) as: "Servers that provide resolution of host and domain names to their IP addresses — essential for locating resources on the Internet."\n\nThe DNS resolution chain works as:\n1. Your PC checks its local cache first\n2. If not cached, asks the Recursive Resolver (usually your router or ISP)\n3. The Resolver queries Root → TLD (.com) → Authoritative name servers\n4. The final IP is returned and cached by your OS\n\nRun a DNS lookup now:\n• Windows (CMD): `nslookup google.com`\n• macOS/Linux (Terminal): `dig google.com +short`\n\nThe "Server:" line in nslookup shows which DNS resolver your PC is currently using. The IP addresses returned are Google\'s actual web server IPs.',
                  commands: '# Windows\nnslookup google.com\n\n# macOS/Linux\ndig google.com +short\n\n# To see full resolution chain on macOS:\ndig google.com +trace',
                  expectedResult: 'Returns one or more public IP addresses for google.com. The nslookup output also shows which DNS server answered the query (your router or ISP resolver).',
                  question: 'What IP address(es) were returned for google.com? Which DNS server resolved the query (the "Server:" line in nslookup)? What well-known TCP/UDP port does DNS use?',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'The textbook explains that most networks have a primary and alternate DNS server configured. The primary handles all queries; the alternate is a failover if the primary is unreachable.\n\nChange your DNS servers to public resolvers:\n• Windows: ncpa.cpl → adapter Properties → IPv4 Properties → "Use the following DNS server addresses"\n  - Preferred: 1.1.1.1 (Cloudflare — privacy-focused)\n  - Alternate: 8.8.8.8 (Google — highly reliable)\n• macOS: System Settings → Network → Wi-Fi → Details → DNS tab → click (+) to add 1.1.1.1 and 8.8.8.8\n\nAfter applying, run `nslookup google.com` again and verify the "Server:" line now shows 1.1.1.1 as the resolver.',
                  commands: '# Verify new DNS server is active\nnslookup google.com\n\n# Should show Server: 1.1.1.1',
                  expectedResult: 'The nslookup "Server:" line changes from your router\'s IP (e.g., 192.168.1.1) to 1.1.1.1, confirming DNS queries now go directly to Cloudflare rather than your router.',
                  question: 'What does the "Server:" field show in nslookup after changing DNS? What is the practical difference between using your router as a DNS forwarder vs. using 1.1.1.1 directly?',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'The CompTIA A+ textbook notes that DNS records are cached locally by the OS to speed up repeat queries. When you change DNS servers, stale cached entries from the old server may persist and cause resolution failures until the cache is cleared.\n\nFlush the DNS resolver cache:\n• Windows CMD: `ipconfig /flushdns`\n  Expected output: "Successfully flushed the DNS Resolver Cache."\n• macOS: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`\n• Linux: `sudo systemd-resolve --flush-caches`\n\nAfter flushing, run `nslookup google.com` one final time to confirm DNS resolution still works with the new server.',
                  commands: '# Windows\nipconfig /flushdns\n\n# macOS\nsudo dscacheutil -flushcache\nsudo killall -HUP mDNSResponder\n\n# Verify resolution still works\nnslookup google.com',
                  expectedResult: 'Windows confirms "Successfully flushed the DNS Resolver Cache." The follow-up nslookup confirms DNS resolution still functions correctly via the new server (1.1.1.1).',
                  question: 'What exact confirmation message did ipconfig /flushdns or dscacheutil return? Why is it necessary to flush the DNS cache after changing DNS server addresses?',
                  order: 3,
                }
              ]
            }
          },
          {
            title: 'Lab 9: SMB File Sharing & NTFS Permissions',
            objective: 'Configure Server Message Block (SMB) file sharing and understand the difference between Share permissions and NTFS permissions. Aligned with CompTIA A+ Core 2 (220-1202) Module 5: Supporting Windows, and Module 6: Securing Windows.',
            prerequisites: 'Two computers on the same network. Windows OS on the server machine.',
            order: 3,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'The CompTIA A+ Core 2 textbook (Module 5) explains that SMB (Server Message Block) is the protocol Windows uses for file sharing over a network. When you share a folder, two independent permission layers apply:\n\n1. Share Permissions — control access over the network connection\n2. NTFS Permissions — control access at the file system level for ALL users (local AND network)\n\nThe effective permission is always the most RESTRICTIVE combination of both layers.\n\nOn the Windows server machine:\n• Create a folder on the Desktop: right-click Desktop → New → Folder → name it "SMB_Lab"\n• Right-click "SMB_Lab" → Properties → "Sharing" tab → click "Advanced Sharing"\n• Check "Share this folder" → click "Permissions"\n• Note that "Everyone" gets "Read" by default. Change this to "Full Control" for this exercise → click OK',
                  expectedResult: 'The folder now has a share icon overlay (two people) visible in File Explorer, and the share name "SMB_Lab" is listed in the Advanced Sharing dialog.',
                  question: 'What share name was created? What permission level did you grant to "Everyone" in the Share Permissions? What is the UNC path format to access this share from another machine?',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'Now connect to the share from the client machine using its UNC (Universal Naming Convention) path.\n\nFirst, get the server machine\'s IP address:\n• Server: open CMD → `ipconfig` → note the IPv4 address\n\nOn the client machine:\n• Windows: open File Explorer → click the address bar → type: `\\\\[Server_IP]\\SMB_Lab` → press Enter\n• macOS: open Finder → Go menu → "Connect to Server..." → type: `smb://[Server_IP]/SMB_Lab` → click Connect\n\nYou will be prompted for credentials — enter the local username and password of an account that EXISTS on the server machine.',
                  commands: '# Windows File Explorer address bar\n\\\\192.168.1.50\\SMB_Lab\n\n# macOS Finder > Connect to Server\nsmb://192.168.1.50/SMB_Lab',
                  expectedResult: 'A credential dialog appears. After entering valid server credentials, the shared folder opens and its contents are visible in the client\'s file manager.',
                  question: 'Were you prompted for credentials? What username did you use? After connecting, could you see the folder contents? What does the UNC path \\\\ prefix signify in Windows networking?',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'Test write access by creating a file from the client inside the shared folder. Drag a file into the SMB_Lab window, or right-click inside it → New → Text Document.\n\nThe textbook notes: "NTFS permissions take precedence over Share permissions in many scenarios. The effective access right is the most restrictive of both." If the NTFS permissions on the folder do not allow the network user to write, the operation will fail — even if Share permissions allow Full Control.\n\nTo check NTFS permissions on the SERVER: right-click "SMB_Lab" → Properties → "Security" tab. The "Security" tab shows NTFS ACL (Access Control List) entries. Verify your user account or "Users" group has "Write" or "Modify" permission.',
                  expectedResult: 'If NTFS permissions allow Write/Modify, the new file is created successfully and appears on both the server and client. If NTFS only allows Read, you get an Access Denied error despite Full Control share permissions.',
                  question: 'Were you able to create or copy a file into the share from the client machine? Look at the NTFS Security tab on the server — what permissions does the "Users" group have? Explain in your own words how NTFS and Share permissions interact.',
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
      title: 'Module 4: Virtualization & Multi-Device Networking',
      description: 'Deploy Type-2 hypervisors to run isolated guest operating systems, and scan your LAN using ARP and network mapping tools. Aligned with CompTIA A+ Core 1 (220-1201) Module 8: Supporting Virtualization and Cloud, and Module 6 (ARP, MAC addressing).',
      order: 4,
      labs: {
        create: [
          {
            title: 'Lab 10: Deploying a Virtual Machine with VirtualBox',
            objective: 'Install a Type-2 hypervisor and configure an Ubuntu Linux guest VM with bridged networking. Covers CompTIA A+ Core 1 (220-1201) virtualization concepts: hypervisor types, virtual disk formats, and virtual NIC modes.',
            prerequisites: 'VirtualBox installed (virtualbox.org). Ubuntu Desktop ISO downloaded (ubuntu.com/download/desktop).',
            order: 1,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'The CompTIA A+ Core 1 textbook explains two types of hypervisors:\n\n• Type 1 (Bare-Metal) — runs directly on hardware with no host OS (e.g., VMware ESXi, Microsoft Hyper-V). Used in enterprise data centers.\n• Type 2 (Hosted) — runs as an application on top of a host OS (e.g., VirtualBox, VMware Workstation). Used for personal labs and development.\n\nVirtualBox is a Type 2 hypervisor. Open VirtualBox and click "New":\n• Name: Ubuntu_Lab\n• Type: Linux → Ubuntu (64-bit)\n• RAM: at least 2048 MB (2GB) — dedicate no more than 50% of your host RAM\n• Virtual Hard Disk: Create → VDI (VirtualBox Disk Image), Dynamically Allocated, 20 GB\n\nVDI is VirtualBox\'s native format. VMDK is VMware\'s format. Both can be used interchangeably in VirtualBox.\n\nFinish the wizard — do NOT start the VM yet.',
                  expectedResult: 'The new VM "Ubuntu_Lab" appears in the VirtualBox Manager list with 2GB RAM and a 20GB VDI disk configured.',
                  question: 'What is the difference between a Type 1 and Type 2 hypervisor? Which type is VirtualBox, and what does "dynamically allocated" mean for the virtual disk?',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'By default, VirtualBox places new VMs on a "NAT" network — meaning the VM gets internet access via the host, but the host and other LAN devices cannot reach the VM directly.\n\nFor this lab we want the VM to behave like a real PC on your home network:\n• Click the VM → Settings → Network → Adapter 1\n• Change "Attached to" from "NAT" to "Bridged Adapter"\n• Select your active physical NIC from the "Name" dropdown (Wi-Fi or Ethernet)\n\nVirtualBox network modes:\n• NAT — VM shares host\'s IP via address translation (VM is isolated from LAN)\n• Bridged Adapter — VM gets its own IP from your router, visible to all LAN devices\n• Host-Only — VM can only communicate with the host, fully isolated from internet\n• Internal Network — VMs can talk to each other only, no host or internet access',
                  expectedResult: 'Network adapter is set to Bridged mode. When the VM boots, your home router will assign it its own IP address — separate from the host machine\'s IP.',
                  question: 'What are the four VirtualBox network adapter modes? When would you use NAT vs Bridged vs Host-Only? Which mode gives the VM its own unique IP on your LAN?',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'Now boot the VM:\n• Click Start. VirtualBox will ask for the ISO file — navigate to your downloaded Ubuntu .iso\n• Follow the Ubuntu installer (choose "Try or Install Ubuntu" → "Install Ubuntu" → minimal install)\n• After install, eject the ISO and reboot the VM\n• Once the desktop loads, press Ctrl + Alt + T to open a terminal\n\nRun these commands to verify networking:\n  ip a                    → shows all interfaces and IP addresses\n  ping -c 4 8.8.8.8       → tests internet connectivity\n  ping -c 4 [host_IP]     → tests connectivity to your physical machine',
                  commands: 'ip a\nping -c 4 8.8.8.8\n# Also ping your host machine\'s IP to confirm bridged networking works',
                  expectedResult: 'The VM shows a unique IP address in your home subnet (e.g., 192.168.1.x, different from your host). Ping to 8.8.8.8 succeeds, confirming internet access. Ping to host IP also succeeds, confirming bridged operation.',
                  question: 'What IP address was assigned to the Ubuntu VM? Is it on the same /24 subnet as your host machine? Did both ping tests succeed, confirming the bridge adapter is working?',
                  order: 3,
                }
              ]
            }
          },
          {
            title: 'Lab 11: Network Mapping with ARP & Nmap',
            objective: 'Use ARP table inspection and active scanning to enumerate all live hosts on your local subnet. Aligned with CompTIA A+ Core 1 (220-1201) Module 6: understanding MAC addresses, ARP, and broadcast domains.',
            prerequisites: 'A device connected to your home network. Nmap optionally installed (nmap.org).',
            order: 2,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'The CompTIA A+ Core 1 textbook explains that every network interface card (NIC) has a burned-in MAC (Media Access Control) address — a 48-bit hardware address written in hexadecimal (e.g., AA:BB:CC:DD:EE:FF). MAC addresses operate at OSI Layer 2 (Data Link).\n\nARP (Address Resolution Protocol) maps Layer 3 IP addresses to Layer 2 MAC addresses. Your OS maintains an ARP cache — a temporary table of recently-resolved IP-to-MAC mappings.\n\nView your ARP cache:\n  arp -a\n\nThe output shows IP addresses paired with their hardware MAC addresses. The entry for your default gateway IP is your router\'s MAC address.',
                  commands: 'arp -a',
                  expectedResult: 'The terminal displays a table with IP addresses (e.g., 192.168.1.1) matched to 12-character hexadecimal MAC addresses (e.g., aa:bb:cc:11:22:33).',
                  question: 'What is the IP and MAC address of your default gateway (router) as shown in the ARP table? What OSI layer does ARP operate at, and why does it need to map IP addresses to MAC addresses?',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'Log into your home router\'s web interface to see which devices the DHCP server has assigned addresses to.\n\nOpen a browser and navigate to your router\'s IP (usually the default gateway from your ARP output — e.g., 192.168.1.1 or 10.0.0.1).\n\nDefault credentials are typically printed on the router label. Look for a section called:\n• "Attached Devices" / "Connected Clients"\n• "DHCP Leases" / "LAN Clients"\n• "Device List"\n\nThis table shows every device the DHCP server has issued a lease to, including IP, MAC address, device name, and lease expiry time.',
                  expectedResult: 'A table appears listing all DHCP-assigned devices on your network: phones, laptops, smart TVs, gaming consoles — each with their IP and MAC address.',
                  question: 'How many devices are shown in the router\'s DHCP lease table? Does this count match what you saw in the ARP table? What hostname/device name is listed for your main computer?',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'For a more thorough scan, use Nmap — an industry-standard network scanner. The "-sn" flag performs a "ping sweep" (host discovery only, no port scanning).\n\nFirst, identify your subnet:\n• Windows: `ipconfig` → note your IPv4 address and subnet mask\n• macOS/Linux: `ifconfig` → note the inet address\n\nIf your IP is 192.168.1.50 with mask 255.255.255.0, your subnet is 192.168.1.0/24.\n\nRun the scan:\n  nmap -sn 192.168.1.0/24\n\nNmap sends ARP requests to all 254 addresses in the /24 range and reports which hosts replied.',
                  commands: '# Replace with your actual subnet\nnmap -sn 192.168.1.0/24\n\n# Alternative if Nmap not installed — ARP scan via ping sweep:\nfor i in {1..254}; do ping -c1 -W1 192.168.1.$i > /dev/null && echo "192.168.1.$i is UP"; done',
                  expectedResult: 'Nmap reports the number of "hosts up" and lists each one with its IP address and MAC address (on the same LAN segment). The count should roughly match the router\'s DHCP table.',
                  question: 'How many live hosts did Nmap or the ping sweep discover on your subnet? Did Nmap identify your Ubuntu VM as a separate host? What is the difference between a ping sweep and a port scan?',
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
      title: 'Module 5: Users, Permissions & Security Tools',
      description: 'Apply the Principle of Least Privilege through user account management, NTFS ACLs, and Linux file permissions. Configure host-based firewalls and master command-line diagnostic tools. Aligned with CompTIA A+ Core 2 (220-1202) Module 6: Securing Windows, Module 9: Configuring SOHO Network Security, and Module 4: Managing Windows.',
      order: 5,
      labs: {
        create: [
          {
            title: 'Lab 12: User Account Management & Access Control Lists',
            objective: 'Create restricted local user accounts and enforce file-level security via NTFS ACLs and Linux chmod. Covers CompTIA A+ Core 2 (220-1202) Module 6: Securing Windows — Principle of Least Privilege, user groups, and NTFS permissions.',
            prerequisites: 'Administrator access on Windows. Ubuntu VM from Lab 10 (for the Linux steps).',
            order: 1,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'The CompTIA A+ Core 2 textbook (Module 6) defines the Principle of Least Privilege (PoLP) as: granting users only the minimum permissions necessary to perform their job — no more. This reduces the attack surface and limits damage from compromised accounts.\n\nWindows has three primary local account types:\n• Administrator — full system access, can install software and modify any setting\n• Standard User — can use installed apps, cannot change system-wide settings\n• Guest — highly restricted, no persistent settings (disabled by default in Windows 10/11)\n\nCreate a restricted Standard User:\n• Press Win + R → type `compmgmt.msc` → press Enter\n• Expand Local Users and Groups → Users\n• Right-click blank area → "New User..."\n• Username: guestlab | Password: LabPass1!\n• Uncheck "User must change password at next logon"\n• Ensure the user is NOT added to the Administrators group → click Create',
                  expectedResult: 'The "guestlab" account appears in the Users list. It has no Administrator group membership — only the default "Users" group.',
                  question: 'What group(s) is the "guestlab" account a member of by default? What capabilities does this group grant vs the Administrators group? How does this relate to the Principle of Least Privilege?',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'Now enforce file-level access control using NTFS ACLs (Access Control Lists).\n\nThe textbook explains that NTFS permissions apply to every file and folder, for both local and network access. "Deny" permissions override all "Allow" permissions.\n\nOn your C: drive, create a folder "TopSecret":\n• Right-click "TopSecret" → Properties → "Security" tab\n• Click "Edit..." → select the "Users" group\n• In the Deny column, check: Full Control, Modify, Read & Execute, Read, Write\n• Click Apply — Windows warns this will deny access. Click Yes.\n\nThis explicitly denies the "Users" group all access, ensuring only Administrators can open the folder.',
                  expectedResult: 'The NTFS Security tab shows the Users group with Deny checkmarks for all permission types. The folder icon may now show a padlock overlay.',
                  question: 'In NTFS permissions, why does a "Deny" entry override a "Allow" entry even if the user is in multiple groups? What happens if you Deny access to the "Everyone" group?',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'Test the ACL by logging in as the restricted user:\n• Click Start → click your avatar/name → "Sign out"\n• Log in with: username "guestlab", password "LabPass1!"\n• Open File Explorer → navigate to C:\\ → double-click "TopSecret"\n\nThe textbook notes: Windows evaluates the user\'s group memberships against all ACL entries and returns the most restrictive effective permission. Since "guestlab" is in the "Users" group which has Deny on all permissions, access is blocked.',
                  expectedResult: 'Windows displays "You don\'t have permission to access this folder" or a similar Access Denied dialog — proving the NTFS ACL is enforced at login.',
                  question: 'What was the exact error message shown when "guestlab" tried to open TopSecret? Log back into your admin account afterward. Why might it be more secure to use "Deny" sparingly instead of simply removing "Allow" permissions?',
                  order: 3,
                },
                {
                  stepNumber: 4,
                  description: 'Replicate the Least Privilege concept on Linux using POSIX (Portable Operating System Interface) file permissions.\n\nOpen your Ubuntu VM terminal. Linux permission system uses three categories:\n• Owner (u) — the file creator\n• Group (g) — a group of users sharing access\n• Others (o) — everyone else\n\nEach category gets Read (4), Write (2), Execute (1) — added together as an octal digit:\n• 7 = Read + Write + Execute (4+2+1)\n• 6 = Read + Write (4+2)\n• 5 = Read + Execute (4+1)\n• 4 = Read only\n• 0 = No permissions\n\nRun these commands:\n  sudo adduser labguest   ← create a new restricted user\n  touch ~/secret_file.txt  ← create a test file\n  chmod 700 ~/secret_file.txt  ← owner: rwx | group: none | others: none\n  ls -la ~/secret_file.txt     ← verify permissions',
                  commands: 'sudo adduser labguest\ntouch ~/secret_file.txt\nchmod 700 ~/secret_file.txt\nls -la ~/secret_file.txt',
                  expectedResult: 'ls -la shows: -rwx------ indicating the owner has read/write/execute, while group and others have zero permissions.',
                  question: 'What does the permission string "-rwx------" mean for each category (owner, group, others)? What chmod value would give owner read/write, group read-only, and others no access?',
                  order: 4,
                }
              ]
            }
          },
          {
            title: 'Lab 13: Host-Based Firewall Configuration',
            objective: 'Configure Windows Defender Firewall with Advanced Security to create inbound port-blocking rules and validate stateful packet inspection. Aligned with CompTIA A+ Core 2 (220-1202) Module 9: Configuring SOHO Network Security.',
            prerequisites: 'Windows OS with admin rights. A second device (phone or laptop) on the same network.',
            order: 2,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'The CompTIA A+ Core 2 textbook (Module 9) explains that a host-based firewall filters traffic entering and leaving a single device, operating independently from network firewalls. Windows Defender Firewall uses stateful packet inspection — it automatically allows REPLY traffic to outbound connections you initiate, while blocking unsolicited inbound connections.\n\nBy default, Windows Defender Firewall:\n• BLOCKS all inbound connections not matching an explicit Allow rule\n• ALLOWS all outbound connections (with some exceptions)\n\nCreate an explicit Inbound Block rule for TCP port 80 (HTTP):\n• Press Win key → type "Windows Defender Firewall with Advanced Security" → press Enter\n• Left pane: click "Inbound Rules"\n• Right pane: click "New Rule..."\n• Rule type: Port → Next\n• Protocol: TCP | Specific local ports: 80 → Next\n• Action: Block the connection → Next\n• Profile: check all three (Domain, Private, Public) → Next\n• Name: "Block HTTP Lab" → Finish',
                  expectedResult: 'The "Block HTTP Lab" rule appears at the top of the Inbound Rules list with a red circle/stop icon, indicating it is active and blocking.',
                  question: 'By default, does Windows Defender Firewall block or allow unsolicited inbound connections? What is the difference between an "inbound" rule and an "outbound" rule? What is stateful packet inspection?',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'Test the firewall rule by running a temporary Python web server on port 80 and attempting to reach it from another device.\n\nOn your PC, open Command Prompt as Administrator:\n  python -m http.server 80\n\nThis starts a web server serving your current directory on port 80.\n\nOn a DIFFERENT device (phone, tablet, or second laptop) on the same Wi-Fi:\n• Open a browser\n• Navigate to: http://[your_PC_IP_address]\n• Note the browser\'s behavior\n\nThe firewall drops the inbound TCP SYN packet before it reaches Python, so the connection never completes. This is "DROP" behavior (vs "REJECT" which sends back an error).',
                  commands: '# On your PC (as Administrator)\npython -m http.server 80\n\n# From another device — visit in browser:\nhttp://192.168.1.X',
                  expectedResult: 'The browser on the second device shows a connection timeout (spins for ~30 seconds then fails) — NOT an immediate connection refused error. This is because the firewall silently drops (not rejects) the packet.',
                  question: 'Did the browser time out or immediately refuse? What is the difference between a firewall "DROP" vs "REJECT" response? Why does a timeout suggest the packet was silently dropped?',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'Now disable the rule and confirm traffic is permitted:\n• In Windows Defender Firewall, find "Block HTTP Lab" in Inbound Rules\n• Right-click it → "Disable Rule" (keeps the rule but deactivates it)\n• On the second device, refresh the browser or navigate to http://[your_PC_IP] again\n\nWith no blocking rule, Python\'s HTTP server on port 80 receives the connection and responds with a directory listing.\n\nWhen done: stop Python with Ctrl+C. Go back and DELETE the "Block HTTP Lab" rule to clean up.',
                  commands: '# Stop the Python web server\nCtrl + C\n\n# Clean up — delete the firewall rule via PowerShell (run as Admin)\nRemove-NetFirewallRule -DisplayName "Block HTTP Lab"',
                  expectedResult: 'After disabling the rule, the browser successfully loads a directory listing page served by Python, confirming the firewall was the only thing blocking traffic on port 80.',
                  question: 'What page content did the browser show after the rule was disabled? What does HTTP port 80 serve? What is the HTTPS equivalent port, and why is it preferred over port 80 in production?',
                  order: 3,
                }
              ]
            }
          },
          {
            title: 'Lab 14: Network Diagnostic Command Line Tools',
            objective: 'Use traceroute, netstat, and tasklist to diagnose routing paths, open ports, and running services. Aligned with CompTIA A+ Core 2 (220-1202) Module 4/5: Managing and Supporting Windows CLI tools.',
            prerequisites: 'Terminal/command prompt. Administrator access recommended.',
            order: 3,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'The CompTIA A+ Core 2 textbook (Module 5) covers traceroute as a diagnostic tool that shows the path packets take across the internet; it reveals each router (hop) between your device and a destination.\n\nEach hop is displayed with its IP address and three round-trip time measurements (in ms). An asterisk (*) means the router did not respond (often blocked by firewall).\n\nRun traceroute to Cloudflare\'s DNS:\n• Windows: `tracert 1.1.1.1`\n• macOS/Linux: `traceroute 1.1.1.1`\n\nObserve: Hop 1 is always your default gateway (home router). Subsequent hops are your ISP\'s routers. Later hops are backbone internet routers. The final hop is 1.1.1.1 (Cloudflare).',
                  commands: '# Windows\ntracert 1.1.1.1\n\n# macOS/Linux\ntraceroute 1.1.1.1',
                  expectedResult: 'Displays a numbered list of router hops. Hop 1 IP matches your default gateway. Total hops to 1.1.1.1 is typically 8-15 hops depending on your ISP and geography.',
                  question: 'What IP address is Hop 1 in your traceroute, and does it match your router? How many total hops did it take to reach 1.1.1.1? What does a row of asterisks (* * *) mean in a traceroute?',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'The textbook covers `netstat` as a tool to display active network connections and listening ports. Combined with flags:\n\n• -a: all connections and listening ports\n• -n: show numeric IPs (no DNS resolution)\n• -o (Windows): show the owning Process ID (PID)\n• -t (Linux): show TCP connections only\n\nRun to see what services are listening on your machine:\n• Windows (Admin CMD): `netstat -ano | findstr LISTENING`\n• macOS: `netstat -anp tcp | grep LISTEN`\n• Linux: `ss -tlnp`\n\nCommon ports to recognize:\n• 135, 445 (Windows RPC/SMB)\n• 22 (SSH)\n• 80 (HTTP), 443 (HTTPS)\n• 3389 (RDP)',
                  commands: '# Windows (run as Administrator)\nnetstat -ano | findstr LISTENING\n\n# macOS\nnetstat -anp tcp | grep LISTEN\n\n# Linux\nss -tlnp',
                  expectedResult: 'A list of local address:port combinations in LISTENING state, each with a PID. For example: "TCP 0.0.0.0:135 ... LISTENING 1234" shows a service listening on all interfaces on port 135.',
                  question: 'List three ports shown in LISTENING state on your machine and identify what service each likely belongs to. What does "0.0.0.0" vs "127.0.0.1" as the local address mean for a listening service?',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'Cross-reference a PID from netstat with the process name using tasklist (Windows) or ps (Linux).\n\nFrom the netstat output in Step 2, pick any PID number. Then:\n\n• Windows CMD: `tasklist | findstr [PID]`\n• macOS/Linux: `ps aux | grep [PID]`\n\nThis reveals the exact executable name bound to that port. For example, PID 4 is often "System" (Windows kernel), and svchost.exe hosts many Windows services.\n\nThis technique is used in real incident response to identify whether a listening port belongs to a legitimate service or potential malware.',
                  commands: '# Windows — replace 1234 with actual PID\ntasklist | findstr 1234\n\n# macOS/Linux\nps aux | grep 1234\n\n# PowerShell — more detailed:\nGet-Process -Id 1234 | Select-Object Name,Path',
                  expectedResult: 'Returns one line showing the process name (e.g., svchost.exe, nginx, python), its PID, memory usage, and session. This confirms which application owns the listening port.',
                  question: 'What executable name was returned for your chosen PID? Is it a well-known Windows/system process or something else? How would a security analyst use this technique to detect unauthorized services?',
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
      description: 'Connect securely to remote infrastructure using RDP (graphical) and SSH (command-line). Implement asymmetric cryptography for passwordless authentication. Aligned with CompTIA A+ Core 2 (220-1202) Module 5: Supporting Windows (RDP/NLA), Module 8: Supporting Other OS (SSH, Linux administration).',
      order: 6,
      labs: {
        create: [
          {
            title: 'Lab 15: Remote Desktop Protocol (RDP) Setup',
            objective: 'Enable and configure Remote Desktop on Windows, connect from a client device, and understand Network Level Authentication (NLA). Aligned with CompTIA A+ Core 2 (220-1202) Module 5: Supporting Windows — remote access tools.',
            prerequisites: 'Windows 10/11 Pro or Enterprise on the host PC (Windows Home cannot host RDP). A second device to connect from.',
            order: 1,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'The CompTIA A+ Core 2 textbook (Module 5) explains that Remote Desktop Protocol (RDP) allows a user to remotely view and control another computer\'s graphical desktop over a network. Key facts:\n\n• RDP uses TCP port 3389 by default\n• Only Windows Pro/Enterprise/Server can HOST an RDP session (Windows Home cannot)\n• Network Level Authentication (NLA) requires the user to authenticate BEFORE the full desktop session loads — improving security by blocking unauthenticated access\n\nOn the HOST PC (must be Windows Pro):\n• Press Win + I → System → Remote Desktop\n• Toggle "Enable Remote Desktop" to On\n• Confirm "Network Level Authentication" is enabled (recommended)\n• Note your PC name under "PC name" section\n• Run `ipconfig` in CMD to get your IPv4 address',
                  expectedResult: 'Remote Desktop is enabled. The settings page shows your PC name and confirms NLA is active. Your IPv4 address is noted for the next step.',
                  question: 'What is the default TCP port for RDP? What is Network Level Authentication (NLA), and why is it more secure than connecting without it? Can Windows 10 Home host RDP sessions?',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'Connect to the host PC from a secondary device:\n\n• Windows → Open "Remote Desktop Connection" (search in Start or run `mstsc`). Enter the host IP in the "Computer:" field. Click Connect. When prompted by NLA, enter the host machine\'s Windows username and password.\n\n• macOS → Download "Microsoft Remote Desktop" from the Mac App Store. Click (+) → Add PC → enter the host IP. Double-click the entry, enter credentials when prompted.\n\nWhen connected, you will see the full Windows desktop of the remote machine rendered in a window. You can control it completely — keyboard, mouse, and clipboard are all forwarded.',
                  commands: '# Windows — open Remote Desktop Connection\nmstsc\n\n# Or via command line to connect directly:\nmstsc /v:192.168.1.X',
                  expectedResult: 'The remote Windows desktop appears in a window on your client device. Anything you type or click is executed on the remote machine. The remote machine\'s screen may show a lock screen during the session.',
                  question: 'Were you able to connect successfully? What credentials did you use? What happened to the physical display on the host PC while you were connected via RDP?',
                  order: 2,
                }
              ]
            }
          },
          {
            title: 'Lab 16: SSH Remote Access to Linux VM',
            objective: 'Install and configure OpenSSH server on Ubuntu, connect via SSH from the host OS, and understand the SSH handshake and host key verification. Aligned with CompTIA A+ Core 2 (220-1202) Module 8: Supporting Other OS.',
            prerequisites: 'Ubuntu VM from Lab 10, running with Bridged networking.',
            order: 2,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'The CompTIA A+ Core 2 textbook (Module 8) explains SSH (Secure Shell) as a protocol that provides an encrypted command-line channel to a remote machine. Unlike Telnet (which transmits data in plaintext), SSH uses strong cryptographic encryption for all traffic.\n\nKey SSH facts:\n• SSH uses TCP port 22 by default\n• The SSH server (daemon) on Linux is called sshd (OpenSSH Server)\n• UFW (Uncomplicated Firewall) on Ubuntu must allow port 22\n\nOn your Ubuntu VM, open a terminal:\n  sudo apt update && sudo apt install openssh-server -y\n  sudo systemctl enable --now ssh\n  sudo systemctl status ssh\n  sudo ufw allow ssh\n  sudo ufw enable\n\nConfirm the sshd status shows "active (running)" in green text.',
                  commands: 'sudo apt update && sudo apt install openssh-server -y\nsudo systemctl enable --now ssh\nsudo systemctl status ssh\nsudo ufw allow ssh\nsudo ufw enable',
                  expectedResult: 'systemctl status ssh shows "active (running)". UFW reports "Rules updated" for SSH. The SSH daemon is now listening on TCP port 22.',
                  question: 'What is the default TCP port for SSH? What is the name of the SSH server process on Linux? What does enabling "ssh" in UFW do at the network level?',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'Connect from your HOST machine to the Ubuntu VM via SSH.\n\nOn the Ubuntu VM, first get its IP:\n  ip a | grep "inet "\n\nFrom your HOST machine (Windows CMD/PowerShell or macOS Terminal):\n  ssh your_ubuntu_username@[Ubuntu_VM_IP]\n\nFirst connection: SSH displays a "host key fingerprint" and asks:\n  "Are you sure you want to continue connecting (yes/no)?"\n\nType "yes" — this adds the VM\'s public key to your known_hosts file. This is how SSH prevents man-in-the-middle attacks. On subsequent connections, SSH silently verifies the key matches.\n\nEnter your Ubuntu user password when prompted.',
                  commands: '# On Ubuntu VM\nip a | grep "inet "\n\n# On your Host machine\nssh your_ubuntu_username@192.168.1.X',
                  expectedResult: 'After accepting the fingerprint and entering your password, your terminal prompt changes to show the Ubuntu VM\'s hostname — you are now controlling the Linux VM from your host machine\'s terminal.',
                  question: 'What is SSH host key verification, and why does SSH warn you on the first connection? What file stores the accepted host keys on your local machine? What does it mean if SSH shows a "WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED" error?',
                  order: 2,
                }
              ]
            }
          },
          {
            title: 'Lab 17: Passwordless SSH with Ed25519 Key Pairs',
            objective: 'Generate an asymmetric Ed25519 key pair and configure passwordless SSH authentication — the industry standard for secure server access. Aligned with CompTIA A+ Core 2 (220-1202) Module 6 (asymmetric cryptography) and Module 8 (Linux administration).',
            prerequisites: 'Completed Lab 16. SSH working with password authentication.',
            order: 3,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'The CompTIA A+ Core 2 textbook (Module 6: Securing Windows) covers asymmetric cryptography:\n• A key pair consists of two mathematically-linked keys: a Public Key and a Private Key\n• Data encrypted with the Public Key can ONLY be decrypted with the Private Key\n• You share your Public Key freely; your Private Key NEVER leaves your machine\n• SSH uses this: the server stores your Public Key; your client proves identity by demonstrating possession of the Private Key — without transmitting it\n\nAlgorithm choices:\n• RSA-4096: old standard, still widely supported\n• Ed25519: modern elliptic curve algorithm — faster, smaller keys, more secure. Recommended by CompTIA.\n\nGenerate an Ed25519 key pair on your HOST machine:\n  ssh-keygen -t ed25519 -C "lab_key"\n\nPress Enter to accept the default location (~/.ssh/id_ed25519). You may set a passphrase for extra security or press Enter for none.',
                  commands: 'ssh-keygen -t ed25519 -C "lab_key"\n\n# View your generated keys:\nls ~/.ssh/\n\n# View the PUBLIC key (safe to share):\ncat ~/.ssh/id_ed25519.pub',
                  expectedResult: 'Two files created in ~/.ssh/: id_ed25519 (private key — NEVER share) and id_ed25519.pub (public key — safe to distribute). The public key starts with "ssh-ed25519".',
                  question: 'What is the difference between your public key and private key? Which one gets copied to the server? Why is Ed25519 preferred over RSA-2048 for new key generation?',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'Copy your public key to the Ubuntu VM\'s authorized_keys file. The SSH server checks this file to allow key-based login.\n\n• macOS/Linux host: `ssh-copy-id your_ubuntu_user@[Ubuntu_IP]`\n• Windows host: Run this in PowerShell:\n  type $env:USERPROFILE\\.ssh\\id_ed25519.pub | ssh your_ubuntu_user@[Ubuntu_IP] "cat >> ~/.ssh/authorized_keys"\n\nThis appends your public key to ~/.ssh/authorized_keys on the Ubuntu VM. The SSH daemon automatically reads this file for each authentication attempt.',
                  commands: '# macOS/Linux host\nssh-copy-id your_ubuntu_user@192.168.1.X\n\n# Windows PowerShell\ntype $env:USERPROFILE\\.ssh\\id_ed25519.pub | ssh your_ubuntu_user@192.168.1.X "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"',
                  expectedResult: 'After one final password prompt to complete the copy, your public key is appended to ~/.ssh/authorized_keys on the Ubuntu VM.',
                  question: 'What file on the server stores authorized public keys, and where is it located? Why do you need to enter your password now to copy the key, even though the goal is to eliminate passwords?',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'Test passwordless authentication by SSH-ing in again:\n  ssh your_ubuntu_user@[Ubuntu_IP]\n\nThis time, no password prompt should appear. The SSH client automatically uses your private key (~/.ssh/id_ed25519), the server verifies it matches the public key in authorized_keys, and the session opens instantly.\n\nThis is how professional sysadmins and DevOps engineers authenticate to hundreds of servers without typing passwords — it is both more convenient AND more secure than passwords.',
                  commands: 'ssh your_ubuntu_user@192.168.1.X\n\n# Verify key was used (verbose output shows auth method):\nssh -v your_ubuntu_user@192.168.1.X 2>&1 | grep "Authentication"',
                  expectedResult: 'SSH session opens immediately without any password prompt. The -v (verbose) output shows "Authentication succeeded (publickey)" confirming key-based auth was used.',
                  question: 'Did the connection open without a password prompt? Using the -v flag, what authentication method does SSH report using? Why is key-based authentication considered more secure than password authentication against brute-force attacks?',
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
      description: 'Deploy a headless server OS from scratch, apply the CompTIA 6-step methodology to a compound DHCP+DNS failure scenario, and build a fully functional IT lab environment with a live web server. Aligned with CompTIA A+ Core 2 (220-1202) Module 7: Installing Operating Systems and Module 1: Troubleshooting Process.',
      order: 7,
      labs: {
        create: [
          {
            title: 'Lab 18: Headless Ubuntu Server Deployment',
            objective: 'Install Ubuntu Server (no GUI) in a VirtualBox VM, understand resource efficiency vs Desktop editions, and manage services via systemctl. Aligned with CompTIA A+ Core 2 (220-1202) Module 7: Installing Operating Systems.',
            prerequisites: 'VirtualBox installed. Ubuntu Server ISO downloaded from ubuntu.com/download/server.',
            order: 1,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'The CompTIA A+ Core 2 textbook (Module 7) covers headless server installation — an OS with no graphical user interface (GUI). Servers run headless because:\n• GUI components consume 300MB–2GB of RAM unnecessarily\n• No display server = smaller attack surface\n• All management is done remotely via SSH — no physical monitor needed\n• System resources go entirely to server workloads\n\nCreate a new VM in VirtualBox:\n• Name: Headless_Server\n• Type: Linux → Ubuntu (64-bit)\n• RAM: 1024 MB (1GB) — notice we only need HALF the RAM of the Desktop VM\n• CPU: 1 core\n• Disk: VDI, Dynamically Allocated, 10 GB\n• Network: Bridged Adapter\n\nAttach the Ubuntu Server ISO to the optical drive and click Start.',
                  expectedResult: 'The VM boots into the Ubuntu Server text-based installer — no graphical mouse interface, just keyboard-driven menus.',
                  question: 'Why does the server edition require less RAM than the Desktop edition? What is the primary management interface for a headless server? What attack surface reduction does removing the GUI provide?',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'Navigate the text-based installer using arrow keys and Enter:\n\n1. Select "Install Ubuntu Server"\n2. Language → English\n3. Network → DHCP will auto-configure (note the IP shown)\n4. Storage → "Use entire disk" → confirm with "Done" and "Continue"\n5. Profile → set your name, server hostname (e.g., "labserver"), username, and password\n6. SSH → CHECK the box to "Install OpenSSH server" (press Space to toggle) → Done\n7. Features → skip all snap packages → Done\n8. Wait for installation to complete → Reboot Now\n9. When asked to remove the installation medium, press Enter\n\nThe textbook notes that including OpenSSH during installation is standard practice for server deployment — it allows immediate remote management after first boot.',
                  expectedResult: 'Ubuntu Server installs and reboots into a terminal login prompt (no graphical desktop). You should see a login prompt: "labserver login:"',
                  question: 'Why is it important to install OpenSSH server during the Ubuntu Server setup rather than after? During the text installer, at what screen did you enable SSH, and how did you toggle it on?',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'Log in and verify the server\'s resource efficiency — the key advantage of headless servers.\n\nAt the login prompt, enter your username and password. Then run:\n  free -h         → shows RAM usage in human-readable format\n  top             → live process monitor (press q to quit)\n  systemctl status ssh    → verify SSH is running\n  ip a            → confirm network and IP address\n\nThe -h flag in free means "human-readable" (shows MB/GB instead of bytes). Compare the idle RAM usage to your Ubuntu Desktop VM.',
                  commands: 'free -h\ntop\nsystemctl status ssh\nip a',
                  expectedResult: 'free -h shows total memory usage under 300MB at idle (vs ~1-2GB for Ubuntu Desktop). systemctl status ssh shows "active (running)". IP address is accessible from the host network.',
                  question: 'What is the total idle RAM consumption of Ubuntu Server vs Ubuntu Desktop (from Lab 10)? What does "active (running)" in systemctl output confirm? SSH into this server from your host machine using the IP shown in `ip a`.',
                  order: 3,
                }
              ]
            }
          },
          {
            title: 'Lab 19: OSI Model Troubleshooting — Compound DHCP + DNS Failure',
            objective: 'Simulate a realistic multi-layer network failure and systematically resolve it using the CompTIA 6-step troubleshooting methodology applied to each OSI model layer. Aligned with CompTIA A+ Core 1 (220-1201) Module 1 and Core 2 (220-1202) Module 1.',
            prerequisites: 'Windows PC with internet connection. Willingness to temporarily break network settings.',
            order: 2,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'The CompTIA A+ textbooks define the OSI (Open Systems Interconnection) model as a 7-layer framework for understanding and troubleshooting network communications:\n\nLayer 1 — Physical: cables, NICs, Wi-Fi radio\nLayer 2 — Data Link: MAC addresses, switches, frames\nLayer 3 — Network: IP addresses, routers, packets\nLayer 4 — Transport: TCP/UDP, ports, segments\nLayer 5-6 — Session/Presentation: encryption, sessions\nLayer 7 — Application: HTTP, DNS, FTP, user-facing protocols\n\nTROUBLESHOOTING RULE: Always diagnose from Layer 1 UP. Never skip layers.\n\nBreak your network now (STEP 1 — Identify the Problem):\n• Open ncpa.cpl → right-click adapter → Properties → IPv4 → Properties\n• Set DNS server to a bogus IP: 10.0.0.99\n• Click OK\n• Open CMD: `ipconfig /release`\n\nYour internet is now broken via two methods: no valid DHCP IP lease + broken DNS.',
                  commands: '# Windows CMD — release IP lease\nipconfig /release\n\n# Verify broken state\nipconfig\nping 8.8.8.8\nping google.com',
                  expectedResult: 'ipconfig shows no IPv4 address (or 169.254.x.x APIPA). All ping attempts fail. The network status icon may show "No Network" or "No Internet".',
                  question: 'What IP address does Windows assign itself when DHCP fails (APIPA range)? What is APIPA (Automatic Private IP Addressing) and why can it only communicate locally? On which OSI layer is DHCP operating?',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'Apply the CompTIA 6-step methodology. Work upward through OSI layers:\n\nSTEP 1 confirmed: Internet is broken, APIPA address assigned.\nSTEP 2 (Establish theory): Probably a DHCP issue (Layer 3).\nSTEP 3 (Test theory): Run `ipconfig /renew` to request a new DHCP lease:\n\n  ipconfig /renew\n\nNow run: `ping 8.8.8.8` — does it work?\n\nIf YES → Layer 3 is fixed. DHCP worked.\nBut try: `ping google.com` — does it fail?\n\nIf YES it fails → Layer 7 (Application layer) issue. DNS is broken.\n\nThe textbook notes: "A successful ping to an IP but failed ping to a hostname definitively isolates the fault to the DNS resolution component."',
                  commands: 'ipconfig /renew\nping 8.8.8.8\nping google.com',
                  expectedResult: 'After /renew, ipconfig shows a valid 192.168.x.x IP. Ping to 8.8.8.8 succeeds. But ping to google.com fails with "Ping request could not find host google.com".',
                  question: 'What did `ipconfig /renew` do, and at what OSI layer did this fix occur? If 8.8.8.8 pings successfully but google.com does not, which specific OSI layer is still broken and why?',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'STEPS 4–6: Plan fix, implement, verify, and document.\n\nThe DNS fix:\n• Open ncpa.cpl → adapter Properties → IPv4 → Properties\n• Change DNS from "10.0.0.99" back to "Obtain DNS server address automatically"\n• Click OK\n\nFlush the stale DNS cache:\n  ipconfig /flushdns\n\nVerify full restoration:\n  ping google.com\n  nslookup google.com\n\nOpen a browser and load a website.\n\nSTEP 6: Document: "Root causes were: (1) DHCP lease released manually — fixed with ipconfig /renew; (2) Invalid static DNS 10.0.0.99 — fixed by restoring DHCP DNS. Both are Layer 3 and Layer 7 failures respectively."',
                  commands: '# Restore DNS\nipconfig /flushdns\n\n# Verify\nping google.com\nnslookup google.com\n\n# Full connectivity confirmation\nping -c 4 8.8.8.8',
                  expectedResult: 'ping google.com succeeds with ICMP replies. nslookup returns valid IPs. Website loads in browser. Full network connectivity is restored.',
                  question: 'Write a brief incident report following CompTIA documentation best practices: what were the two root causes, how were they identified, and what were the fix steps? On what OSI layers did each failure occur?',
                  order: 3,
                }
              ]
            }
          },
          {
            title: 'Lab 20: Capstone — Build a Full Mini IT Environment',
            objective: 'Final capstone: deploy Nginx web server on the Linux VM, customize the hosted page, verify cross-device access, and understand HTTP response codes. Integrates skills from all 7 modules.',
            prerequisites: 'Ubuntu Server VM (Lab 18) or Desktop VM (Lab 10) accessible via SSH. Host machine with web browser.',
            order: 3,
            steps: {
              create: [
                {
                  stepNumber: 1,
                  description: 'SSH into your Linux VM from your host machine:\n  ssh your_user@[VM_IP]\n\nInstall Nginx — a high-performance open-source web server used by millions of websites worldwide:\n  sudo apt update && sudo apt install nginx -y\n\nEnable Nginx to start automatically on boot and start it now:\n  sudo systemctl enable --now nginx\n\nVerify it is running:\n  sudo systemctl status nginx\n\nCheck Nginx is listening on port 80:\n  ss -tlnp | grep 80\n\nAlso make sure UFW allows HTTP traffic:\n  sudo ufw allow "Nginx HTTP"',
                  commands: 'sudo apt update && sudo apt install nginx -y\nsudo systemctl enable --now nginx\nsudo systemctl status nginx\nss -tlnp | grep 80\nsudo ufw allow "Nginx HTTP"',
                  expectedResult: 'systemctl status nginx shows "active (running)". ss output shows ":80" in LISTEN state. UFW confirms "Nginx HTTP" rule added.',
                  question: 'What does `systemctl enable` do vs `systemctl start`? On what TCP port does Nginx listen by default, and what protocol does that port serve? What is the difference between a web server and a web application?',
                  order: 1,
                },
                {
                  stepNumber: 2,
                  description: 'Customize the default Nginx page to personalize your lab server.\n\nNginx serves web files from /var/www/html/ by default. Edit the main page:\n  sudo nano /var/www/html/index.nginx-debian.html\n\nInside nano:\n• Use arrow keys to navigate to the <title> tag — change to: My CompTIA Lab Server\n• Find the <h1> tag — change to: Welcome to My Home Lab\n• Add a paragraph: <p>CompTIA A+ Lab Environment — All 20 labs complete.</p>\n\nSave and exit:\n  Ctrl + O → Enter (save)  \n  Ctrl + X (exit)\n\nReload Nginx to apply changes (optional — static file changes don\'t require reload):\n  sudo systemctl reload nginx',
                  commands: 'sudo nano /var/www/html/index.nginx-debian.html\n\n# After editing:\nsudo systemctl reload nginx',
                  expectedResult: 'The file is saved with your custom HTML content. No errors from Nginx reload — the web server accepts the updated content immediately.',
                  question: 'What directory does Nginx use as its default "web root" to serve files from? What is the difference between `systemctl reload` and `systemctl restart` for a production web server?',
                  order: 2,
                },
                {
                  stepNumber: 3,
                  description: 'Confirm your web server is accessible from the host machine\'s browser:\n\nGet your VM\'s IP address:\n  ip a | grep "inet "\n\nOn your HOST machine, open Chrome/Edge/Firefox and navigate to:\n  http://[VM_IP_address]\n\nYou should see your customized page. To see the underlying HTTP response code, open your browser\'s developer tools:\n• Press F12 → Network tab → reload the page\n• Click on the first request → look for "Status Code"\n\nHTTP status codes (CompTIA exam objectives):\n• 200 OK — success, page delivered\n• 301/302 — redirect\n• 403 Forbidden — server found the resource but refuses access\n• 404 Not Found — resource doesn\'t exist\n• 500 Internal Server Error — server-side crash',
                  commands: '# On VM\nip a | grep "inet "\n\n# On host browser\n# Navigate to: http://[VM_IP]\n\n# Optional: use curl to see HTTP status from command line\ncurl -I http://[VM_IP]',
                  expectedResult: 'The browser loads your custom "Welcome to My Home Lab" page. Browser DevTools shows HTTP 200 OK status code. curl -I shows "HTTP/1.1 200 OK" in its header response.',
                  question: 'What HTTP status code did the browser report for your page? What does HTTP 200 OK mean? What would cause a 404 Not Found error from Nginx? Congratulations — you have built a functional home lab IT environment from scratch!',
                  order: 3,
                }
              ]
            }
          }
        ]
      }
    }
  })

  console.log('Successfully seeded enhanced CompTIA A+ Core 1 & Core 2 aligned lab curriculum!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
