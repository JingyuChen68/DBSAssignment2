import { Lesson } from "./lessons";

export const EXPANDED_LESSONS: Lesson[] = [
  // ─── VISUAL DIAGRAMS & REFERENCES ─────────────────────────
  {
    slug: "visual-diagrams",
    category: "Visual References",
    title: "Circuit & System Diagrams You Must Know",
    description: "Timing diagrams, block diagrams, protocol waveforms, and circuit schematics that appear on whiteboards and in interviews.",
    icon: "📐",
    color: "cyan",
    gradientFrom: "from-cyan-500",
    gradientTo: "to-blue-600",
    difficulty: "Intermediate",
    estimatedMinutes: 35,
    sections: [
      {
        title: "Reading Timing Diagrams",
        content: "Timing diagrams show how digital signals change over time. They're essential for understanding protocols (SPI, I2C, UART), verifying setup/hold times, and debugging with oscilloscopes. Each horizontal line represents a signal, time moves left to right, and transitions show rising/falling edges. Interviewers often ask you to draw timing diagrams for protocol transactions or to identify problems in existing ones.",
        tips: [
          "Label every signal clearly: clock, data, chip-select, etc.",
          "Mark setup and hold time windows around clock edges",
          "Show don't-care regions with cross-hatching (XXX)",
          "When drawing SPI timing, always start with the chip-select going low"
        ]
      },
      {
        title: "Block Diagrams for System Design",
        content: "Block diagrams are the language of system-level thinking. In an interview, you'll often be asked: 'Design a system that does X.' Start with a block diagram showing: power supply, MCU, sensors, actuators, communication interfaces, and user I/O. Use arrows to show data flow and label each connection with the protocol (SPI, I2C, GPIO, etc.). Include power rails and ground. A clear block diagram demonstrates you can think at the system level before diving into details.",
        tips: [
          "Start with the MCU in the center — everything connects to it",
          "Group related blocks: sensing, actuation, communication, power",
          "Label every connection with the protocol and data direction",
          "Include power budget estimates next to each block",
          "Don't forget safety elements: watchdog, fuses, ESD protection"
        ]
      },
      {
        title: "Common Circuit Patterns to Recognize",
        content: "Certain circuit patterns appear everywhere in embedded systems. Learn to recognize them at a glance: voltage dividers (sensor reading, level shifting), RC filters (low-pass for noise, high-pass for AC coupling), H-bridges (motor control), op-amp configurations (inverting, non-inverting, differential), pull-up/pull-down networks, and bypass/decoupling capacitor arrangements. Being able to sketch these from memory is a huge interview advantage.",
        tips: [
          "Voltage divider: Vout = Vin × R2/(R1+R2) — used constantly for level shifting and ADC input",
          "RC low-pass cutoff: fc = 1/(2πRC) — this is the most-asked analog formula in interviews",
          "Know how to calculate current-limiting resistors for LEDs: R = (Vsupply - Vf) / If",
          "Practice drawing an H-bridge and explaining shoot-through protection"
        ]
      },
      {
        title: "Memory Maps & Register Layouts",
        content: "Embedded engineers work with memory-mapped peripherals. A memory map shows how the address space is divided: Flash at 0x0800_0000, SRAM at 0x2000_0000, peripherals at 0x4000_0000 (for a typical STM32). Register layouts show individual bits within a peripheral register — which bits control what function. Being able to read a datasheet register description and write code to configure it is a core embedded skill.",
        tips: [
          "Always read the reset value of a register — it tells you the default configuration",
          "Reserved bits should be left at their reset values — never write 1 to reserved bits",
          "Use Read-Modify-Write pattern for registers where you only want to change some bits",
          "Memorize the GPIO, UART, and timer register layouts for your favorite MCU family"
        ]
      }
    ],
    keyTakeaways: [
      "Practice drawing timing diagrams for SPI, I2C, and UART from memory",
      "Start system design questions with a clear block diagram before any code",
      "Recognize common circuit patterns: voltage dividers, RC filters, H-bridges",
      "Be comfortable reading memory maps and register bit-field descriptions from datasheets"
    ]
  },

  // ─── REAL-WORLD CASE STUDIES ──────────────────────────────
  {
    slug: "famous-embedded-bugs",
    category: "Case Studies",
    title: "Famous Embedded Bugs & Disasters",
    description: "Real-world failures that changed the industry: Mars Pathfinder, Toyota, Therac-25, Ariane 5, and more. Know these stories — interviewers love discussing them.",
    icon: "🔥",
    color: "red",
    gradientFrom: "from-red-500",
    gradientTo: "to-orange-600",
    difficulty: "Beginner",
    estimatedMinutes: 40,
    sections: [
      {
        title: "Mars Pathfinder: Priority Inversion in Space",
        content: "In 1997, the Mars Pathfinder rover experienced repeated system resets after landing. The cause was a classic priority inversion bug in its VxWorks RTOS. A low-priority meteorological task held a shared mutex that a high-priority data bus task needed. A medium-priority communication task would preempt the low-priority task, preventing it from releasing the mutex, which starved the high-priority task and triggered the watchdog timer. The fix was enabling priority inheritance on the mutex — something the VxWorks RTOS supported but the engineers hadn't turned on. NASA engineers uploaded a patch from Earth to fix the running software on Mars.",
        tips: [
          "This is THE most commonly referenced embedded bug in interviews",
          "Key lesson: always enable priority inheritance on mutexes in an RTOS",
          "The watchdog timer actually saved the mission by resetting the system each time",
          "Discussion point: why wasn't this caught in ground testing? (Different timing characteristics)"
        ]
      },
      {
        title: "Therac-25: When Software Kills",
        content: "The Therac-25 was a radiation therapy machine that killed at least 6 patients between 1985-1987 due to software bugs. The machine had two modes: low-power electron beam and high-power X-ray. A race condition in the control software allowed the high-power beam to fire without the required metal target in place, delivering 100x the intended radiation dose. Contributing factors included: removal of hardware safety interlocks (relying solely on software), inadequate testing, poor error handling (cryptic 'MALFUNCTION' messages operators learned to ignore), and no independent safety monitoring. This case fundamentally changed how safety-critical software is developed.",
        tips: [
          "Key lesson: never rely solely on software for safety — hardware interlocks are essential",
          "This case led to IEC 62304 (medical device software lifecycle) and IEC 61508 (functional safety)",
          "Discussion point: the race condition only occurred when operators typed fast — testing missed it",
          "Use this story when discussing defense-in-depth, redundancy, and safety certification"
        ]
      },
      {
        title: "Ariane 5 Flight 501: The $370 Million Integer Overflow",
        content: "On June 4, 1996, the Ariane 5 rocket self-destructed 37 seconds after launch. The cause was a software bug in the inertial reference system: a 64-bit floating-point number (horizontal velocity) was converted to a 16-bit signed integer. The value exceeded 32,767, causing an overflow and a hardware exception. The backup system had the identical software, so it failed simultaneously. The navigation system interpreted the error as flight data, triggered corrective maneuvers for a non-existent trajectory deviation, and the rocket broke apart from aerodynamic forces. The software had been reused from Ariane 4, where the velocity values were smaller and the conversion never overflowed.",
        tips: [
          "Key lesson: reusing software in a new context requires re-validating ALL assumptions",
          "The backup system running identical software provided zero redundancy against software bugs",
          "Always validate range constraints when converting between numeric types",
          "Discussion point: the variable that overflowed wasn't even needed after liftoff — it was legacy code"
        ]
      },
      {
        title: "Toyota Unintended Acceleration",
        content: "Between 2000-2010, Toyota vehicles experienced unintended acceleration incidents linked to software in the engine control module. Expert analysis by NASA and embedded systems experts revealed: 10,000+ global variables with no protection, spaghetti code with recursion depths that could overflow the stack, insufficient use of volatile qualifiers, no RTOS memory protection between tasks, inadequate watchdog implementation (single-point-of-failure), and a safety architecture that violated MISRA C guidelines. Toyota settled for $1.2 billion. The case became a landmark for automotive software safety standards (ISO 26262).",
        tips: [
          "Key lesson: coding standards like MISRA C exist for a reason — they prevent exactly these issues",
          "The expert testimony about 'spaghetti code' and stack overflow is extremely detailed and public",
          "This case directly drove the adoption of ISO 26262 for automotive functional safety",
          "Discussion point: how would proper RTOS configuration and memory protection have helped?"
        ]
      },
      {
        title: "Stuxnet: When Embedded Systems Become Targets",
        content: "Discovered in 2010, Stuxnet was a sophisticated cyber weapon targeting Siemens S7-300 PLCs controlling uranium enrichment centrifuges in Iran. It exploited four Windows zero-day vulnerabilities to spread, then specifically targeted PLCs running particular Step 7 configurations. The malware subtly altered centrifuge motor speeds (between 1,410 Hz and 2 Hz) while reporting normal values to the monitoring system. It damaged roughly 1,000 centrifuges. Stuxnet demonstrated that industrial control systems and embedded devices are vulnerable to targeted attacks, fundamentally changing how we think about embedded security.",
        tips: [
          "Key lesson: embedded systems need security-in-depth, not just physical isolation (air gaps)",
          "Stuxnet checked for specific Siemens S7-300 PLC configurations before activating",
          "The malware hid its activity by replaying 'normal' sensor data to the HMI — a man-in-the-middle attack on the control loop",
          "This case drove IEC 62443 (industrial cybersecurity) adoption worldwide"
        ]
      }
    ],
    keyTakeaways: [
      "Know at least 3 of these stories in detail — they come up in system design and behavioral interviews",
      "Each story illustrates a fundamental embedded principle: safety interlocks, priority inversion, numeric overflow, code quality, security",
      "These cases drove the major safety standards: IEC 61508, ISO 26262, IEC 62304, IEC 62443",
      "The common thread: complexity that wasn't properly managed through testing, review, and safety architecture"
    ]
  },

  // ─── INTERVIEW WALKTHROUGH ────────────────────────────────
  {
    slug: "interview-walkthrough",
    category: "Interview Strategy",
    title: "The Embedded Interview: A Complete Walkthrough",
    description: "What to expect at each stage, how to approach whiteboard problems, what companies look for, and common mistakes to avoid.",
    icon: "🎙️",
    color: "fuchsia",
    gradientFrom: "from-fuchsia-500",
    gradientTo: "to-purple-600",
    difficulty: "Beginner",
    estimatedMinutes: 35,
    sections: [
      {
        title: "The Typical Embedded Interview Pipeline",
        content: "Most embedded/hardware companies follow this pattern: (1) Resume screen — recruiter call, 15-30 min, focus on experience fit. (2) Technical phone screen — 45-60 min, coding or concept questions over video call, often involving C programming and basic embedded concepts. (3) On-site/virtual loop — 4-6 hours, typically includes: a coding round (C/C++, algorithms), a system design round, a hardware/debugging round, and a behavioral round. Some companies add a take-home project (design a simple embedded system). (4) Team match — some companies do a final cultural fit conversation. The entire process typically takes 2-6 weeks.",
        tips: [
          "Start applying early — embedded hiring is slower than software due to smaller teams",
          "Ask the recruiter what to expect: some companies use LeetCode-style problems, others don't",
          "For hardware roles, expect schematic review and oscilloscope-related questions",
          "Defense/aerospace companies may add a security clearance process (add months)"
        ]
      },
      {
        title: "How to Approach Whiteboard Problems",
        content: "Embedded whiteboard problems are different from typical software interviews. You might be asked to: design a device driver, implement a circular buffer, draw a state machine, debug a timing issue from a scope trace, or design a simple embedded system. The approach: (1) Clarify requirements — ask about constraints (memory, speed, real-time requirements). (2) Draw a diagram first — block diagram for system design, state diagram for FSMs. (3) Write pseudo-code before real code. (4) Talk through edge cases: what happens during power-on, overflow, error conditions? (5) Discuss testing — how would you verify this works?",
        tips: [
          "ALWAYS ask clarifying questions first: 'What processor? How much RAM? Any real-time constraints?'",
          "Draw before you code — diagrams show system-level thinking",
          "Name variables clearly in C: 'uart_rx_buffer' not 'buf'",
          "Mention error handling proactively: 'What should happen if the I2C NACK occurs?'",
          "End with testing: 'I'd verify this by...' — shows engineering maturity"
        ]
      },
      {
        title: "System Design Interview Strategy",
        content: "System design is where embedded interviews shine. You'll get prompts like: 'Design a battery-powered wireless sensor node' or 'Design the firmware for a motor controller.' Follow this framework: (1) REQUIREMENTS — ask about performance, power, cost, safety, environment. (2) ARCHITECTURE — draw a block diagram with MCU, sensors, actuators, power, comms. (3) COMPONENT SELECTION — justify your MCU choice, sensor choice, protocol choice. (4) SOFTWARE DESIGN — task decomposition, state machines, data flow. (5) TRADE-OFFS — discuss what you'd do differently with more time/money. (6) TESTING — unit tests, integration, HIL, field testing. Spend about 5 min on requirements, 10 min on architecture, 15 min on details, 5 min on testing.",
        tips: [
          "Budget your time: don't spend 20 minutes on requirements — keep it focused",
          "Have a go-to MCU family you know well (STM32, ESP32, nRF52) for component selection",
          "Always mention power budget — interviewers want to hear you think about battery life",
          "End with: 'If I had more time, I'd also consider...' — shows depth of knowledge"
        ]
      },
      {
        title: "Common Mistakes That Cost Offers",
        content: "After interviewing hundreds of candidates, here's what hiring managers say kills an embedded interview: (1) Not asking clarifying questions — jumping straight into code without understanding constraints. (2) Ignoring hardware — discussing only software when the system involves sensors, power, and physical interfaces. (3) No error handling — writing the happy path only and not considering what happens when things fail. (4) Overcomplicating solutions — using an RTOS when a simple state machine would work, or adding unnecessary abstraction layers. (5) Poor communication — not explaining your thought process as you work. (6) Not knowing your resume — being unable to discuss your own projects in depth. (7) Ignoring power and cost — critical constraints in real embedded products.",
        tips: [
          "Practice explaining your thought process out loud while solving problems",
          "Review every project on your resume — be ready for deep technical questions on each one",
          "If you don't know something, say so honestly, then explain how you'd find out",
          "Bring enthusiasm for hardware/embedded specifically — generic 'software' enthusiasm won't cut it"
        ]
      }
    ],
    keyTakeaways: [
      "The embedded interview tests breadth (hardware + software + systems) not just coding",
      "Always draw a diagram before writing code in system design rounds",
      "Ask clarifying questions about constraints — it's what real engineers do",
      "Practice out loud: explain your thinking as you work through problems"
    ]
  },

  // ─── CHEAT SHEETS & QUICK REFERENCES ──────────────────────
  {
    slug: "cheat-sheets",
    category: "Quick Reference",
    title: "Embedded Systems Cheat Sheets",
    description: "One-page reference cards for protocols, formulas, register conventions, C gotchas, and the most common interview patterns.",
    icon: "📋",
    color: "lime",
    gradientFrom: "from-lime-500",
    gradientTo: "to-green-600",
    difficulty: "Beginner",
    estimatedMinutes: 25,
    sections: [
      {
        title: "Protocol Comparison Quick Reference",
        content: "Here's the at-a-glance comparison of every protocol you need to know for interviews. When asked 'which protocol would you choose?' reference this mental model. UART: 2 wires (TX/RX), async, point-to-point, 9600-921600 baud, no clock line, simple but needs matched baud rates. SPI: 4+ wires (MOSI/MISO/SCLK/CS), sync, master-slave, up to 50+ MHz, full-duplex, fast but needs one CS per slave. I2C: 2 wires (SDA/SCL), sync, multi-master/multi-slave, 100/400kHz/1MHz, addressable, fewer wires but slower. CAN: 2 wires (differential), async, multi-master, 1 Mbps, message-priority arbitration, automotive standard, robust noise immunity. USB: 2+2 wires, complex protocol stack, up to 20 Gbps, standardized device classes. Ethernet: high bandwidth, 100Mbps-10Gbps, needs PHY chip, good for data-heavy applications.",
        tips: [
          "Quick decision tree: Fast + simple → SPI. Few wires + many devices → I2C. Automotive/noisy → CAN. Async debug → UART.",
          "Know data rates by heart: I2C standard 100kHz, fast 400kHz, fast-plus 1MHz",
          "SPI has no standard addressing — each device needs its own chip-select line",
          "CAN uses differential signaling — immune to common-mode noise, perfect for vehicles"
        ]
      },
      {
        title: "Essential Formulas & Numbers",
        content: "These are the formulas and numbers that come up repeatedly in embedded interviews. Memorize them. Ohm's Law: V = IR. Power: P = IV = I²R = V²/R. Voltage divider: Vout = Vin × R2/(R1+R2). RC time constant: τ = RC (5τ for 99% settling). Low-pass cutoff: fc = 1/(2πRC). ADC LSB: Vref / 2^n. ADC SNR: 6.02n + 1.76 dB. Nyquist: fs ≥ 2 × fmax. Buck duty cycle: D = Vout/Vin. Boost duty cycle: D = 1 - Vin/Vout. LDO dissipation: P = (Vin - Vout) × I. Decibels: dB = 20 log₁₀(V2/V1). Timer period: T = (PSC+1)(ARR+1)/fclk. Baud rate timing: Tbit = 1/baudrate.",
        tips: [
          "Write these on scratch paper at the start of your interview — it shows preparation",
          "Know powers of 2 up to 2^16 = 65536 by heart",
          "Common numbers: 3.3V and 5V logic, 8/16/32 MHz crystal, 4.7kΩ I2C pullups",
          "RC filter: for 1kHz cutoff with 10kΩ resistor → C = 1/(2π×10000×1000) ≈ 16nF"
        ]
      },
      {
        title: "C Language Gotchas for Embedded",
        content: "These C pitfalls trip up even experienced developers. They're popular interview topics. (1) Integer promotion: char + char can produce unexpected results due to implicit promotion to int. (2) Signed vs unsigned comparison: comparing -1 < 1U gives false because -1 is converted to a large unsigned number. (3) Sequence points: i++ + i++ is undefined behavior. (4) Struct padding: sizeof(struct) may be larger than sum of members due to alignment. (5) Endianness: byte order matters for multi-byte data over communication interfaces. (6) Volatile: compiler may optimize away reads of hardware registers without it. (7) Stack overflow: recursive functions and large local arrays can silently corrupt memory. (8) Null pointer dereference: accessing address 0x00000000 may actually work on some MCUs (it's the vector table!) but is still a bug.",
        tips: [
          "Use -Wall -Wextra -Werror in your build — catch these at compile time",
          "sizeof(char) is always 1, but CHAR_BIT may not be 8 on DSPs",
          "The 'restrict' keyword tells the compiler pointers don't alias — enables optimizations",
          "Use stdint.h types (uint8_t, int32_t) instead of int/char for portable embedded code"
        ]
      },
      {
        title: "Debugging Toolkit Quick Reference",
        content: "Know these tools and when to use each: (1) Oscilloscope — see analog waveforms, measure frequency/amplitude/rise time, trigger on edges, decode protocols. (2) Logic analyzer — capture many digital channels simultaneously, perfect for protocol debugging (SPI, I2C, UART). (3) JTAG/SWD debugger — set breakpoints, step through code, inspect registers and memory, flash firmware. (4) Multimeter — measure voltage, current, resistance, continuity checks. (5) Serial terminal — printf debugging over UART, logging, command line interfaces. (6) Current probe — measure power consumption profile, find power spikes, optimize sleep modes. (7) Spectrum analyzer — find EMI issues, verify RF performance. Pro tip: for most embedded debugging, you'll use a combination of JTAG + oscilloscope + serial terminal.",
        tips: [
          "If you can only pick one test instrument for an interview: oscilloscope — it shows you understand analog and timing",
          "Printf debugging is valid but mention its limitations: timing overhead, buffer size, changes behavior",
          "Logic analyzers are cheaper than oscilloscopes and perfect for digital protocol debugging",
          "Always mention probing technique: ground lead length matters for high-frequency signals"
        ]
      }
    ],
    keyTakeaways: [
      "Memorize the protocol comparison table — 'which protocol would you use?' is an almost guaranteed question",
      "Know the key formulas cold: voltage divider, RC cutoff, ADC resolution, timer calculations",
      "C gotchas (integer promotion, struct padding, volatile) are very popular interview topics",
      "Be able to describe when and why you'd use each debugging tool"
    ]
  },

  // ─── HARDWARE & TOOLS GUIDE ───────────────────────────────
  {
    slug: "lab-tools-guide",
    category: "Tools & Equipment",
    title: "Lab Tools & Equipment Mastery",
    description: "How to use oscilloscopes, logic analyzers, soldering stations, and development boards — the hands-on skills interviewers test.",
    icon: "🔬",
    color: "blue",
    gradientFrom: "from-blue-500",
    gradientTo: "to-indigo-600",
    difficulty: "Beginner",
    estimatedMinutes: 30,
    sections: [
      {
        title: "Oscilloscope Skills",
        content: "An oscilloscope is the most important instrument for an embedded engineer. Key skills to demonstrate in interviews: (1) Setting up proper triggering — edge trigger on the signal of interest, use trigger holdoff for periodic signals. (2) Measuring timing — use cursors to measure pulse width, period, rise/fall time. (3) Protocol decoding — most modern scopes can decode SPI, I2C, UART, CAN directly. (4) Power analysis — measure inrush current, ripple voltage on power rails. (5) Bandwidth vs sampling rate — bandwidth should be 5x your signal frequency, sampling rate should be 10x bandwidth. (6) Probing — use the ground spring, not the long ground clip, for high-frequency measurements. (7) Math functions — FFT for frequency analysis, averaging for noise reduction.",
        tips: [
          "If asked 'how would you debug this?', mentioning specific oscilloscope techniques shows hands-on experience",
          "Know the difference between bandwidth (analog) and sampling rate (digital): both matter",
          "10:1 probes reduce loading but also reduce signal amplitude by 10x — adjust your vertical scale",
          "AC coupling removes DC offset to zoom in on ripple and noise",
          "The ground lead is an antenna at high frequencies — keep it short"
        ]
      },
      {
        title: "Development Board Ecosystem",
        content: "Knowing development boards shows you can prototype quickly. The most important ones to be familiar with: STM32 Nucleo/Discovery — industry-standard ARM Cortex-M boards, supported by STM32CubeIDE, CubeMX for code generation, huge ecosystem. Arduino — great for rapid prototyping, massive library support, but limited for production. ESP32 — WiFi/BLE built-in, dual-core, perfect for IoT projects, used with ESP-IDF or Arduino framework. Raspberry Pi Pico — RP2040 with PIO (Programmable I/O), good for custom protocols. Nordic nRF52/nRF53 — BLE-focused, ultra-low power, used in wearables and sensors. BeagleBone — Linux-capable with PRU real-time co-processors, good for industrial applications.",
        tips: [
          "Have a 'go-to' dev board you know deeply — being able to discuss one in detail is better than knowing all superficially",
          "STM32 is the safest choice for interviews — most embedded companies use ARM Cortex-M",
          "If you've used ESP32: mention both Arduino framework AND ESP-IDF to show depth",
          "Mention specific peripherals you've used: timers, DMA, ADC, PWM — not just 'blinked an LED'"
        ]
      },
      {
        title: "Soldering & PCB Assembly",
        content: "Hands-on hardware skills set embedded engineers apart from pure software developers. What interviewers want to hear: (1) Through-hole soldering — basic skill, should be comfortable and fast. (2) SMD soldering — hand soldering 0603/0805 components, TQFP packages. (3) Hot air rework — removing and replacing components, especially QFN/BGA. (4) Soldering inspection — knowing what good vs cold vs bridged joints look like. (5) ESD precautions — wrist straps, ESD-safe surfaces, proper handling. (6) PCB inspection — checking for shorts, opens, and correct component orientation before power-on. (7) Debug headers — designing for testability: JTAG/SWD access, test points on key signals.",
        tips: [
          "Even if you're a firmware person, basic soldering skills show you're comfortable with hardware",
          "If you've designed a PCB, bring it to the interview (or have photos ready) — it's a powerful differentiator",
          "Know the difference between lead and lead-free solder: 63/37 vs SAC305, different melting points",
          "Mention DFM (Design for Manufacturing) and DFT (Design for Test) to show production awareness"
        ]
      },
      {
        title: "Version Control & Build Systems for Embedded",
        content: "Modern embedded development uses professional tooling. Git: every embedded team uses it — know branching strategies, bisect for finding bugs, and submodules for libraries. Build systems: Make is the classic (know how to write a Makefile), CMake is increasingly popular, and vendor IDEs (Keil, IAR, STM32CubeIDE) have their own project systems. CI/CD: Jenkins, GitHub Actions, or GitLab CI for automated builds and tests. Static analysis: PC-Lint, Coverity, or open-source cppcheck catch bugs before they hit hardware. Unit testing: CppUTest, Unity, or Ceedling for testing embedded code on the host machine.",
        tips: [
          "Mention git bisect in interviews — it's perfect for finding which commit introduced a hardware regression",
          "If you've set up CI for an embedded project, that's impressive and worth highlighting",
          "Know the difference between cross-compilation and native compilation",
          "MISRA C compliance checking with static analysis is increasingly required in automotive/medical"
        ]
      }
    ],
    keyTakeaways: [
      "Oscilloscope proficiency is the #1 hands-on skill interviewers look for",
      "Have a go-to development board you know deeply and can discuss specific peripherals",
      "Soldering skills and PCB familiarity differentiate you from pure software candidates",
      "Modern embedded uses Git, CI/CD, static analysis, and unit testing — know the tools"
    ]
  },

  // ─── INDUSTRY KNOWLEDGE ───────────────────────────────────
  {
    slug: "industry-landscape",
    category: "Industry Knowledge",
    title: "The Embedded Industry Landscape",
    description: "Understand the major sectors, key companies, industry trends, and what makes embedded different from web/mobile — essential context for interviews.",
    icon: "🌍",
    color: "slate",
    gradientFrom: "from-slate-600",
    gradientTo: "to-zinc-700",
    difficulty: "Beginner",
    estimatedMinutes: 25,
    sections: [
      {
        title: "Major Sectors & What They Need",
        content: "Embedded engineers work across many industries, each with unique requirements. Automotive: ISO 26262 safety, CAN/LIN buses, AUTOSAR, long product lifecycles (10+ years), extreme temperature ranges. Medical: IEC 62304 software lifecycle, FDA/CE approval, biocompatibility, ultra-reliable systems, patient safety paramount. Aerospace/Defense: DO-178C certification, radiation-hardened components, extreme reliability requirements, long development cycles. Consumer electronics: cost-sensitive, fast time-to-market, power efficiency, wireless connectivity (WiFi/BLE). Industrial: 24/7 operation, harsh environments, PLCs and SCADA, Modbus/OPC UA, long support lifecycles. IoT/Smart Home: ultra-low power, wireless (BLE, Zigbee, Thread, Matter), cloud integration, OTA updates.",
        tips: [
          "Tailor your interview prep to the specific industry of the company you're applying to",
          "Medical and automotive have the longest interview processes due to domain knowledge requirements",
          "Consumer electronics moves fast — companies value rapid prototyping and iteration skills",
          "Defense/aerospace values reliability and process — mention testing and documentation"
        ]
      },
      {
        title: "Emerging Trends to Discuss",
        content: "Showing awareness of industry trends demonstrates you're engaged in the field and thinking about the future. Key trends for 2025-2026: RISC-V adoption — open-source instruction set challenging ARM's dominance, especially for custom silicon. AI at the edge — TinyML, TensorFlow Lite Micro running neural networks on MCUs for anomaly detection, voice recognition, and predictive maintenance. Matter/Thread — unified smart home protocol backed by Apple, Google, Amazon, replacing the fragmented Zigbee/Z-Wave landscape. Rust for embedded — memory-safe alternative to C gaining traction for security-critical systems. Chiplet architecture — disaggregated silicon allowing mix-and-match of compute, I/O, and memory dies. Digital twins — virtual replicas of physical systems for testing and simulation.",
        tips: [
          "If you've experimented with RISC-V or Rust for embedded, mention it — it shows curiosity",
          "TinyML is hot right now — even a simple demo (keyword spotting, gesture recognition) stands out",
          "Know the basics of Matter/Thread if interviewing with smart home companies",
          "Don't just list trends — explain WHY they matter and HOW they change embedded development"
        ]
      },
      {
        title: "Embedded vs Software Engineering",
        content: "Interviewers often ask what makes embedded different. Key distinctions: (1) Resource constraints — kilobytes of RAM, not gigabytes; every byte matters. (2) Real-time requirements — missing a deadline isn't just slow, it's a failure or safety issue. (3) Hardware interaction — you debug with oscilloscopes, not just print statements. (4) Long lifecycles — your code may run for 10-20 years in a car or medical device. (5) Testing challenges — you can't easily simulate physical sensors, motors, and environmental conditions. (6) Cross-compilation — code runs on a different architecture than your development machine. (7) Certification requirements — safety-critical code must meet standards like IEC 61508 or DO-178C. (8) Manufacturing concerns — your design must be buildable at scale, testable in a factory, and cost-effective.",
        tips: [
          "When asked 'why embedded?', show passion for the intersection of hardware and software",
          "Mention specific challenges: debugging race conditions on hardware, optimizing for code size",
          "The physicality of embedded is a key differentiator — your code makes real things move",
          "Embedded engineers need to read datasheets, schematics, and PCB layouts — mention this breadth"
        ]
      }
    ],
    keyTakeaways: [
      "Know the major sectors and their unique requirements — tailor your prep to the target company",
      "Be ready to discuss 2-3 industry trends and explain why they matter",
      "Articulate what makes embedded special: constraints, real-time, hardware, safety",
      "Show genuine passion for making physical things work — it's what sets great embedded engineers apart"
    ]
  },

  // ─── SALARY & NEGOTIATION ─────────────────────────────────
  {
    slug: "salary-negotiation",
    category: "Career Advice",
    title: "Salary Negotiation for Embedded Engineers",
    description: "What embedded roles pay, how to evaluate offers, negotiation tactics, and understanding total compensation beyond base salary.",
    icon: "💰",
    color: "emerald",
    gradientFrom: "from-emerald-600",
    gradientTo: "to-green-700",
    difficulty: "Beginner",
    estimatedMinutes: 20,
    sections: [
      {
        title: "Understanding Embedded Compensation",
        content: "Embedded engineering compensation varies widely by sector, location, and experience level. Entry level (0-2 years): $75K-$110K base. Mid-level (3-6 years): $100K-$160K. Senior (7-12 years): $140K-$200K. Staff/Principal (12+ years): $180K-$280K+. Big tech (Apple, Google, Meta, NVIDIA) pays the highest total compensation, often 1.5-2x these base ranges when including stock (RSU) and bonuses. Automotive and medical device companies typically pay less in base but offer more stability. Defense/government contractors offer good benefits and work-life balance but lower total compensation. Startups may offer significant equity but lower base salary.",
        tips: [
          "Total compensation = base + bonus + stock + benefits — don't just compare base salary",
          "Embedded engineers with security clearances command 15-30% premium in defense sector",
          "Location still matters even with remote work — Bay Area and Seattle pay the highest",
          "Certifications (CID for PCB design, PMP, Six Sigma) can help but matter less than project experience"
        ]
      },
      {
        title: "Negotiation Strategies",
        content: "Once you have an offer, you almost always have room to negotiate. Key strategies: (1) Never give your current salary — focus on market rate and your value. (2) Get multiple offers — leverage is the best negotiation tool. (3) Negotiate base salary first, then signing bonus, then stock/RSUs. (4) Ask for specifics: 'What's the salary band for this level?' (5) If they can't move on base, ask for a higher signing bonus, extra PTO, or a 6-month review for a raise. (6) Be enthusiastic but firm: 'I'm very excited about this role. Based on my research and the market, I was hoping we could get to $X.' (7) Always get the final offer in writing before accepting.",
        tips: [
          "Practice saying numbers out loud — it sounds simple but many people stumble when naming a salary",
          "Research on levels.fyi, glassdoor, and TeamBlind for real compensation data",
          "If asked for expectations early, give a range: 'Based on my research, I'm targeting $X-$Y'",
          "The best time to negotiate is after the verbal offer but before you sign — they've already decided they want you"
        ]
      }
    ],
    keyTakeaways: [
      "Know the market rates for your experience level and target sector",
      "Always negotiate — most offers have room to improve",
      "Multiple offers create leverage — apply broadly",
      "Look at total compensation, not just base salary"
    ]
  },

  // ─── PORTFOLIO & RESUME ────────────────────────────────
  {
    slug: "portfolio-resume",
    category: "Career Advice",
    title: "Building a Standout Embedded Portfolio",
    description: "How to build projects, write a resume, create a GitHub portfolio, and present your work in a way that gets you interviews.",
    icon: "📁",
    color: "orange",
    gradientFrom: "from-orange-500",
    gradientTo: "to-amber-600",
    difficulty: "Beginner",
    estimatedMinutes: 30,
    sections: [
      {
        title: "Projects That Impress",
        content: "The best embedded portfolio projects demonstrate hardware-software integration, real problem-solving, and professional-quality documentation. Tier 1 (most impressive): custom PCB with firmware — design a board in KiCad, get it manufactured, write the firmware, document the whole process. Tier 2 (very good): complex sensor/actuator system — a multi-sensor data logger, PID-controlled motor, or wireless mesh network using dev boards. Tier 3 (good): meaningful firmware contribution to open-source, a well-documented driver library, or a protocol implementation. What makes a project stand out: clear README with photos/video, schematic + PCB if applicable, well-structured and commented code, and a blog post or writeup explaining design decisions.",
        tips: [
          "One great project beats five blinky LED projects — go deep, not wide",
          "Include photos and videos of your hardware projects working — they're memorable",
          "Use KiCad (free) for PCB design — even a simple breakout board shows hardware skills",
          "Mention your failures and what you learned — it shows engineering maturity"
        ]
      },
      {
        title: "The Embedded Resume Formula",
        content: "Your resume needs to speak the embedded language. Header: name, email, phone, LinkedIn, GitHub (with hardware projects). Education: degree, relevant coursework (embedded systems, digital design, controls, signals). Experience: use action verbs specific to embedded work — 'Developed firmware for...', 'Designed and tested a PCB...', 'Debugged timing issues using...', 'Optimized power consumption by X%'. For each bullet, include: WHAT you did, WHAT tools/tech you used, and the RESULT (quantified). Skills section: separate into categories — Languages (C, C++, Python, Verilog), Tools (KiCad, STM32CubeIDE, JTAG), Protocols (SPI, I2C, CAN, USB), Platforms (STM32, ESP32, Nordic). Keep it to 1 page for <10 years experience.",
        tips: [
          "Quantify everything: 'Reduced power consumption by 40%' not 'Improved power efficiency'",
          "List specific MCU families, not just 'microcontrollers' — e.g., 'STM32F4, ESP32, nRF52'",
          "Include both hardware and software skills — embedded hiring managers want T-shaped engineers",
          "Tailor your resume for each application: automotive companies want CAN/ISO 26262, IoT wants BLE/WiFi"
        ]
      },
      {
        title: "GitHub Portfolio for Hardware Engineers",
        content: "Your GitHub is your technical portfolio. Make it count. Pin your 4-6 best repositories. Each repo should have: a clear README with project photo/diagram, purpose/motivation, hardware used, how to build/flash, and a demo (video link or GIF). Include hardware design files: KiCad projects, Gerbers, BOMs. For firmware: clear directory structure (src/, inc/, docs/), Makefile or CMakeLists.txt, and inline comments. Create a profile README (special repo with your username) summarizing your embedded focus areas. Contribute to embedded open-source: Zephyr RTOS, PlatformIO, Arduino libraries, or device drivers.",
        tips: [
          "A GitHub with 3 quality embedded projects is better than 30 half-finished ones",
          "Include your PCB design files — KiCad schematics and layouts are very impressive to reviewers",
          "Write READMEs for a hiring manager: what does this do, how does it work, what did you learn?",
          "Commit regularly — a consistent contribution graph shows ongoing engagement"
        ]
      }
    ],
    keyTakeaways: [
      "One complete, well-documented hardware+firmware project is worth more than many superficial ones",
      "Quantify your resume bullets: what you did, what tools, what result",
      "GitHub is your portfolio: pin your best projects, write great READMEs, include hardware files",
      "Document your projects as if someone else needs to build and modify them"
    ]
  }
];
