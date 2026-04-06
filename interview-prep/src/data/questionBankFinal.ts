import { Question } from "@/context/AppContext";

let idCounter = 8000;
function makeQ(
  title: string,
  category: string,
  difficulty: "Easy" | "Medium" | "Hard",
  answer: string,
  notes: string = ""
): Question {
  idCounter++;
  return {
    id: `bank-${idCounter}`,
    title,
    category,
    difficulty,
    answer,
    notes,
    status: "Not Started",
    createdAt: new Date().toISOString(),
  };
}

export const QUESTION_BANK_FINAL: Question[] = [

  // ═══════════════════════════════════════════════════════════════
  // EMBEDDED C/C++ — FINAL BATCH (30)
  // ═══════════════════════════════════════════════════════════════
  makeQ("What is the difference between early binding and late binding in C/C++?", "Embedded C/C++", "Medium",
    "Early binding (compile-time): function call resolved at compile time — direct function calls, static dispatch. Fast and predictable. Late binding (runtime): function call resolved at runtime — virtual functions in C++, function pointers in C. Adds indirection overhead but enables polymorphism. In embedded, prefer early binding for deterministic timing; use late binding for flexibility (callback registration, plugin architectures)."),
  makeQ("How do you implement a software CRC-32 in C?", "Embedded C/C++", "Medium",
    "Table-driven approach: pre-compute a 256-entry table for the polynomial (0xEDB88320 for standard CRC-32). For each byte: crc = table[(crc ^ byte) & 0xFF] ^ (crc >> 8). Initialize with 0xFFFFFFFF, finalize with XOR 0xFFFFFFFF. The table can be stored in Flash (const). Alternatively, many MCUs have hardware CRC peripherals that are much faster."),
  makeQ("What is the volatile and const interaction with pointers to hardware registers?", "Embedded C/C++", "Hard",
    "For a read-only status register: const volatile uint32_t *STATUS = (const volatile uint32_t*)0x40000000; — volatile tells compiler to re-read every time, const prevents accidental writes in code. For a write-only register: volatile uint32_t *CTRL = ...; For read-write: volatile uint32_t *DATA = ...; This pattern is the foundation of all register-level peripheral access."),
  makeQ("What is the use of __attribute__((section)) in embedded?", "Embedded C/C++", "Hard",
    "Places a variable or function in a specific linker section. Uses: put a function in RAM section for faster execution (.ramfunc), place data in backup SRAM (.bkpram), store calibration data at a fixed Flash address, or create custom memory regions. Example: __attribute__((section(\".my_data\"))) uint32_t config; Then define .my_data in the linker script at the desired address."),
  makeQ("How do you implement a simple memory allocator for embedded?", "Embedded C/C++", "Hard",
    "Pool allocator: pre-allocate an array of fixed-size blocks. Maintain a free list (singly linked list of available blocks). Alloc: pop from free list — O(1). Free: push back to free list — O(1). No fragmentation, deterministic timing. Alternative: bump allocator (advance a pointer, never free — for init-only allocations). Both avoid the problems of general-purpose malloc."),
  makeQ("What are pragma directives commonly used in embedded C?", "Embedded C/C++", "Medium",
    "#pragma once: include guard alternative. #pragma pack(n): set struct alignment to n bytes. #pragma weak: declare a weak symbol. #pragma GCC optimize: set optimization level per function. #pragma GCC diagnostic push/pop: temporarily suppress specific warnings. #pragma location: place variable at specific address (IAR). Pragmas are compiler-specific — use with portability in mind."),
  makeQ("What is the difference between a flat memory model and a segmented memory model?", "Embedded C/C++", "Medium",
    "Flat model: entire address space is linear — any address is directly accessible. ARM Cortex-M uses this: 4GB address space, code/RAM/peripherals at fixed address ranges. Segmented model: address is segment:offset (like old x86 real mode) — complex, limited per-segment size. All modern embedded MCUs use flat models. Understanding this helps with: linker scripts, memory maps, and MPU configuration."),
  makeQ("What is designated initialization in C99 structs?", "Embedded C/C++", "Easy",
    "C99 allows initializing specific struct members by name: struct config cfg = { .baud = 115200, .parity = 0, .stopBits = 1 }; Unspecified members are zero-initialized. Benefits: self-documenting, order-independent, safe when struct members are added/reordered. Widely used in embedded for: peripheral configurations, DMA descriptors, and driver initialization structures."),
  makeQ("How do you implement double buffering in embedded?", "Embedded C/C++", "Medium",
    "Use two buffers: one being filled (by DMA/ISR) and one being processed (by application). When the filling buffer is complete, swap pointers. The DMA continues filling the other buffer while the CPU processes the first. Eliminates: data tearing (reading while writing), processing gaps, and synchronization overhead. Used in: audio, display, ADC sampling, and communication."),
  makeQ("What is the startup file in an embedded project and what does it do?", "Embedded C/C++", "Hard",
    "The startup file (startup_stm32f4xx.s or similar) runs before main(). It: 1) Defines the vector table (initial SP + exception handlers). 2) Implements the Reset_Handler: copies .data from Flash to RAM, zeros .bss, calls SystemInit() (clock configuration), then calls main(). 3) Provides default weak handlers for all interrupts. Written in assembly. Provided by the vendor but important to understand."),

  // ═══════════════════════════════════════════════════════════════
  // RTOS — FINAL BATCH (20)
  // ═══════════════════════════════════════════════════════════════
  makeQ("What is the difference between Zephyr RTOS and FreeRTOS?", "RTOS & Scheduling", "Medium",
    "FreeRTOS: minimal kernel, very portable, mature, huge community, many MCU ports, small footprint (~6-10KB). Zephyr: Linux Foundation project, richer feature set (native networking stack, BLE, USB, file system, shell), device tree support, better for complex IoT applications, larger footprint. FreeRTOS for simple real-time; Zephyr for feature-rich IoT projects. Both are open source."),
  makeQ("What is CMSIS-RTOS2 and how does it relate to FreeRTOS?", "RTOS & Scheduling", "Medium",
    "CMSIS-RTOS2 is a standardized RTOS API defined by ARM. It provides a common interface regardless of the underlying RTOS. FreeRTOS can be used through CMSIS-RTOS2 wrappers — your code calls osThreadNew(), which internally calls xTaskCreate(). Benefits: switch RTOS without rewriting application code. Used in STM32CubeMX-generated projects. Direct FreeRTOS API is more feature-complete."),
  makeQ("How do you handle RTOS task starvation?", "RTOS & Scheduling", "Medium",
    "Starvation: a low-priority task never gets CPU time because higher-priority tasks are always ready. Solutions: ensure high-priority tasks block/sleep periodically, use time-slicing among same-priority tasks, implement aging (gradually increase priority of waiting tasks), review task priorities (are some unnecessarily high?), and monitor per-task CPU usage to detect the problem."),
  makeQ("What is an interrupt priority grouping on ARM Cortex-M?", "RTOS & Scheduling", "Hard",
    "ARM Cortex-M splits interrupt priority bits into preemption priority (group) and sub-priority. Preemption priority determines if an ISR can preempt another. Sub-priority determines order when both are pending simultaneously. Configured via NVIC_SetPriorityGrouping(). For FreeRTOS: all ISRs that call FreeRTOS API must have priority >= configMAX_SYSCALL_INTERRUPT_PRIORITY. Misconfiguring this is a common hard-to-find bug."),
  makeQ("What is the Mars Pathfinder priority inversion incident?", "RTOS & Scheduling", "Easy",
    "In 1997, the Mars Pathfinder rover experienced system resets due to priority inversion: a high-priority communication task was blocked by a low-priority data collection task holding a mutex, while a medium-priority task preempted the low-priority one. The watchdog timer fired because the high-priority task missed its deadline. The fix: enable priority inheritance on the mutex. A classic real-world RTOS debugging story.",
    "Great story to reference in behavioral questions about debugging."),
  makeQ("What are the differences between mutex and critical section (interrupt disable)?", "RTOS & Scheduling", "Medium",
    "Critical section (disable interrupts): fastest, no task switch possible, prevents ALL preemption — even ISRs. Use for very short sections only (a few instructions). Mutex: allows other tasks and ISRs to run while blocked, supports priority inheritance, allows longer critical sections. Use mutex for: shared data accessed by multiple tasks. Use interrupt disable for: data shared between a task and an ISR (very briefly)."),
  makeQ("What is the configMAX_SYSCALL_INTERRUPT_PRIORITY in FreeRTOS?", "RTOS & Scheduling", "Hard",
    "This config value defines the highest interrupt priority (lowest numerical value on ARM) that is allowed to call FreeRTOS FromISR API functions. ISRs with higher priority (lower number) than this MUST NOT call any FreeRTOS functions — they're 'above' FreeRTOS and run with zero latency. Common mistake: setting all ISRs to priority 0 (highest) — they can't use FreeRTOS API and will crash."),
  makeQ("How do you implement a producer-consumer pattern with FreeRTOS queues?", "RTOS & Scheduling", "Medium",
    "Producer task: collect data, xQueueSend(queue, &data, timeout). Consumer task: xQueueReceive(queue, &data, portMAX_DELAY) — blocks until data arrives. Queue handles all synchronization. Multiple producers are safe (queue send is atomic). Multiple consumers: each receive gets one item. Queue size buffers bursts. For ISR producers: use xQueueSendFromISR(). This pattern decouples production rate from consumption rate."),
  makeQ("What is priority ceiling emulation in FreeRTOS mutexes?", "RTOS & Scheduling", "Hard",
    "FreeRTOS mutexes use priority inheritance (not priority ceiling). When a high-priority task blocks on a mutex held by a lower-priority task, the holder's priority is temporarily raised to the blocker's priority. This reduces (but doesn't eliminate) priority inversion. For full priority ceiling protocol, you'd need to manually set task priority when acquiring the mutex. Some RTOS (like RTEMS) support ceiling protocol natively."),
  makeQ("What happens if you call a blocking RTOS function from an ISR?", "RTOS & Scheduling", "Easy",
    "It causes a crash, assertion failure, or undefined behavior. ISRs can't block because: there's no 'task context' to save/suspend, and blocking would prevent the ISR from completing (deadlock-like). Always use *FromISR variants of RTOS API (xQueueSendFromISR, xSemaphoreGiveFromISR). These never block — they return an error if the operation can't be completed immediately."),

  // ═══════════════════════════════════════════════════════════════
  // DIGITAL LOGIC — FINAL BATCH (15)
  // ═══════════════════════════════════════════════════════════════
  makeQ("What is a look-up table (LUT) in FPGA architecture?", "Digital Logic & Circuits", "Medium",
    "An FPGA LUT is a small truth table memory (typically 4 or 6 inputs) that can implement any combinational logic function of its inputs. The FPGA fabric consists of thousands of LUTs + flip-flops arranged in configurable logic blocks (CLBs). Configuration bits define the LUT contents. This is how FPGAs achieve programmable logic — any Boolean function maps to one LUT."),
  makeQ("What is clock skew?", "Digital Logic & Circuits", "Medium",
    "Clock skew is the difference in clock arrival time at different flip-flops in a circuit. Caused by: unequal trace lengths, buffer delays, and loading differences. Positive skew (clock arrives later at capture FF) helps setup but hurts hold. Negative skew hurts setup. Minimized by: balanced clock trees, clock buffers, and proper PCB routing. Critical for reliable high-speed operation."),
  makeQ("What is a voltage level shifter?", "Digital Logic & Circuits", "Easy",
    "A level shifter converts logic signals between different voltage domains (e.g., 3.3V ↔ 1.8V, or 5V ↔ 3.3V). Types: resistor divider (high→low only, not fast), MOSFET-based bidirectional (common for I2C), dedicated IC (TXB0108 for bidirectional, 74LVC for unidirectional). Essential when interfacing MCUs operating at different voltages or connecting to legacy 5V components."),
  makeQ("What is a voltage reference and why is it important for ADC?", "Digital Logic & Circuits", "Medium",
    "A voltage reference provides a precise, stable voltage used as the ADC's full-scale reference (VREF). ADC accuracy depends directly on VREF accuracy and stability. MCU internal VREF: convenient but less accurate (1-3% tolerance, temperature drift). External VREF IC: much better accuracy (0.02-0.1%), low noise, low drift. Use external VREF for: precision measurements, calibrated sensors, and 16+ bit ADCs."),
  makeQ("What is signal conditioning?", "Digital Logic & Circuits", "Easy",
    "Signal conditioning prepares a raw sensor signal for ADC conversion. Includes: amplification (increase weak signals), filtering (remove noise/aliasing), level shifting (match ADC input range), buffering (impedance matching), linearization, and protection (clamp overvoltage). Examples: instrumentation amplifier for strain gauge, RC anti-aliasing filter before ADC, voltage divider for high-voltage measurement."),

  // ═══════════════════════════════════════════════════════════════
  // COMMUNICATION PROTOCOLS — FINAL BATCH (20)
  // ═══════════════════════════════════════════════════════════════
  makeQ("What is SDIO/SDMMC and how is it used in embedded?", "Communication Protocols", "Medium",
    "SDIO (Secure Digital Input/Output) / SDMMC is the interface for SD memory cards. Supports 1-bit and 4-bit data bus modes. Speeds: SD (25MB/s), SDHC (50MB/s), SDXC (104MB/s). Many MCUs have dedicated SDMMC peripherals with DMA support. Used for: data logging, firmware storage, configuration files. Requires FatFS or similar file system library."),
  makeQ("What is JTAG boundary scan?", "Communication Protocols", "Medium",
    "Boundary scan (IEEE 1149.1) is a test method using the JTAG port to test interconnections between ICs on a PCB without physical test probes. Each IC has a boundary scan chain of cells at its I/O pins. Through JTAG, you can: drive pins to specific values and read back neighboring IC pins. Detects: open circuits, shorts, and stuck-at faults. Essential for testing BGA and fine-pitch components."),
  makeQ("What is a watchdog communication protocol?", "Communication Protocols", "Medium",
    "Some systems use communication heartbeats as a watchdog: if a device doesn't hear from its peer within a timeout, it takes recovery action (reset, switch to backup, enter safe state). Implemented over CAN, UART, Ethernet, etc. More granular than a hardware watchdog — can detect specific communication failures, not just MCU hangs."),
  makeQ("What is the COBS (Consistent Overhead Byte Stuffing) encoding?", "Communication Protocols", "Hard",
    "COBS is a framing algorithm that replaces zero bytes in data with overhead bytes, allowing 0x00 as an unambiguous frame delimiter. Overhead: exactly 1 byte per 254 data bytes (worst case). More efficient than SLIP/byte-stuffing. Used in: serial protocols where you need reliable framing without fixed-length packets. Simple to implement, deterministic overhead, no escaping issues."),
  makeQ("What is SLIP encoding?", "Communication Protocols", "Medium",
    "SLIP (Serial Line Internet Protocol) is a simple framing protocol: END byte (0xC0) marks frame boundaries. If 0xC0 appears in data, replace with ESC (0xDB) + 0xDC. If 0xDB appears in data, replace with ESC + 0xDD. Very simple to implement. Drawback: variable overhead depending on data content (worst case ~2× for pathological data). COBS has more predictable overhead."),
  makeQ("What is the difference between polling and interrupt-driven communication?", "Communication Protocols", "Easy",
    "Polling: CPU repeatedly checks if data is available (e.g., while(!(USART->SR & RXNE))). Simple but wastes CPU cycles. Interrupt-driven: hardware signals CPU when data arrives, CPU handles it in ISR. Efficient but ISR overhead per byte. DMA: hardware transfers data without CPU at all — best for large/continuous transfers. Typical approach: DMA for high-throughput, interrupts for event-driven, polling for simple/fast checks."),
  makeQ("What is OPC DA vs OPC UA?", "Communication Protocols", "Hard",
    "OPC DA (Data Access): the older COM/DCOM-based standard for reading/writing real-time data from PLCs/devices. Windows-only, security issues, no information modeling. OPC UA (Unified Architecture): the modern replacement — platform-independent, secure (certificates, encryption), rich information modeling (objects, types, methods), supports pub-sub, and works on embedded devices. OPC UA is the future of industrial interoperability."),
  makeQ("What is the difference between Modbus RTU and Modbus TCP?", "Communication Protocols", "Easy",
    "Modbus RTU: runs over RS-232/RS-485 serial. Binary encoding. Frames use CRC-16 error checking. Silent interval separates frames. Modbus TCP: runs over TCP/IP Ethernet. MBAP header replaces CRC (TCP provides error checking). Same function codes and register model. TCP is faster and supports more connections. RTU is simpler for small installations with serial wiring."),

  // ═══════════════════════════════════════════════════════════════
  // MICROCONTROLLERS — FINAL BATCH (15)
  // ═══════════════════════════════════════════════════════════════
  makeQ("What is a clock tree on an MCU?", "Microcontrollers", "Medium",
    "The clock tree generates and distributes clock signals to all MCU peripherals from various sources. Sources: HSI (internal RC, ~1-3% accuracy), HSE (external crystal, much better), LSI/LSE (low-speed for RTC). PLL multiplies the source frequency. Prescalers divide for different bus speeds (AHB, APB1, APB2). Configuring the clock tree correctly is one of the first steps in MCU initialization."),
  makeQ("What is flash programming and how does it work on MCUs?", "Microcontrollers", "Medium",
    "Flash memory stores firmware and data non-volatilely. Programming: 1) Unlock the Flash controller (write magic keys). 2) Erase: set bits to 1 (Flash can only change 1→0, so must erase before writing). Erase granularity varies: sector (4KB-128KB) or page (256B-2KB). 3) Program: write data (word or double-word at a time). 4) Lock Flash. Programming while executing from same Flash bank may require running code from RAM."),
  makeQ("What are backup registers on an MCU?", "Microcontrollers", "Easy",
    "Backup registers are small registers (typically 20-80 bytes) in the MCU's backup domain, powered by VBAT. They retain their values through: power cycles, resets, and standby mode. Used for: storing reset reason, boot counters, small calibration values, wake-up configuration, and passing data between firmware versions across updates. Quick alternative to EEPROM for tiny amounts of persistent data."),
  makeQ("What is the STM32 HAL vs LL (Low-Layer) drivers?", "Microcontrollers", "Medium",
    "HAL: high-level, function-based API that manages peripheral state internally. Easy to use, portable across STM32 families, but adds overhead and hides details. LL: thin inline functions that map directly to register operations — nearly zero overhead, full control, but less portable and more verbose. Use HAL for rapid development; LL for performance-critical paths. They can be mixed in the same project."),
  makeQ("What is ART Accelerator on STM32?", "Microcontrollers", "Medium",
    "ART (Adaptive Real-Time) Accelerator is STM32's Flash prefetch and caching system. It prefetches 128-bit instruction lines from Flash and serves them to the Cortex-M at full CPU speed, hiding Flash wait states. With ART enabled, code runs at the same speed as if it were in RAM (0 wait state effective). Similar to instruction cache but simpler. Enabled via FLASH_ACR register."),

  // ═══════════════════════════════════════════════════════════════
  // PCB — FINAL BATCH (15)
  // ═══════════════════════════════════════════════════════════════
  makeQ("What is a power plane split and when is it needed?", "PCB & Hardware Design", "Medium",
    "A power plane split divides the power layer into regions with different voltages (e.g., 3.3V region and 1.8V region). Place split carefully: never route high-speed signals across the split boundary (no continuous return path causes EMI). Use decoupling capacitors near the split edges. Better alternative for complex designs: use copper pours on signal layers for smaller power domains."),
  makeQ("What is the importance of return path for signals?", "PCB & Hardware Design", "Hard",
    "Every signal has a return path — current flows out through the signal trace and returns through the nearest ground plane underneath. If the ground plane has a gap or split under the signal trace, the return current must detour around it, creating a large loop area that: increases inductance, radiates EMI, and picks up noise. Rule: never route signals across ground plane breaks. Keep the return path tight and continuous."),
  makeQ("What is a guard ring/trace?", "PCB & Hardware Design", "Hard",
    "A guard ring is a grounded trace surrounding a sensitive signal (e.g., high-impedance analog input, crystal oscillator) to shield it from noise coupling. It absorbs interference that would otherwise couple into the sensitive trace. For very high impedance circuits (picoamp sensors), the guard ring may be driven at the same potential as the signal to prevent leakage current."),
  makeQ("What is a star ground vs ground plane approach?", "PCB & Hardware Design", "Medium",
    "Star ground: each circuit block has its own ground trace running back to a single point. Prevents ground currents from one block flowing through another's ground. Used in audio and precision analog. Ground plane: continuous copper layer provides low-impedance ground everywhere. Better for high-speed digital (short return paths). Modern approach: ground plane with careful partitioning — keep noisy digital return currents away from sensitive analog areas."),
  makeQ("What is the clearance requirement for mains voltage on PCBs?", "PCB & Hardware Design", "Hard",
    "Safety standards (IEC 60950/62368) specify minimum clearance (through air) and creepage (along surface) distances based on: voltage, pollution degree, and insulation type. For 240VAC basic insulation: ~2.5mm clearance, ~4mm creepage typical. Reinforced insulation needs double. Slot cuts in PCB can reduce creepage. Always consult the applicable safety standard for your product class."),

  // ═══════════════════════════════════════════════════════════════
  // AUTOMATION — FINAL BATCH (15)
  // ═══════════════════════════════════════════════════════════════
  makeQ("What is Industry 4.0 and how does it relate to automation?", "Automation & PLC", "Medium",
    "Industry 4.0 is the fourth industrial revolution: integrating IoT, AI, cloud computing, and cyber-physical systems into manufacturing. Key concepts: smart factories (self-optimizing production), digital twins (virtual replicas of physical systems), predictive maintenance (ML on sensor data), and interconnected supply chains. Requires: IIoT connectivity (MQTT, OPC UA), edge computing, cybersecurity (IEC 62443), and data analytics."),
  makeQ("What is a HART protocol?", "Automation & PLC", "Medium",
    "HART (Highway Addressable Remote Transducer) is a hybrid protocol: it superimposes digital FSK communication on top of the standard 4-20mA analog signal. The digital signal doesn't affect the analog reading. Benefits: configure instruments remotely, read diagnostics, access multiple process variables — all over existing 2-wire 4-20mA infrastructure. No rewiring needed. Widely used in process industries."),
  makeQ("What is the difference between a sensor and a transducer?", "Automation & PLC", "Easy",
    "A sensor detects a physical quantity (temperature, pressure, light) and provides a signal. A transducer converts one form of energy to another (e.g., pressure to voltage, force to resistance change). In practice, the terms are often used interchangeably. A measurement chain: physical phenomenon → sensing element → transducer → signal conditioning → ADC → digital value."),
  makeQ("What is a strain gauge and how does it work?", "Automation & PLC", "Medium",
    "A strain gauge is a resistive sensor that changes resistance when deformed (strained). Bonded to a surface, it measures mechanical strain. Resistance change is tiny (~0.1%), so a Wheatstone bridge circuit is used for measurement, followed by an instrumentation amplifier. Used in: load cells (weighing scales), structural monitoring, and force/pressure sensors. Gauge factor ~2 for metallic, ~100+ for semiconductor gauges."),
  makeQ("What is a Wheatstone bridge and why is it used?", "Automation & PLC", "Medium",
    "A Wheatstone bridge is a circuit with four resistors arranged in a diamond. A voltage is applied across one diagonal; the other diagonal measures the voltage difference. When balanced (all resistors equal), output is zero. A small change in one resistor (the sensor) creates a measurable voltage proportional to the change. Very sensitive to small resistance changes. Used with: strain gauges, RTDs, and pressure sensors."),
  makeQ("What is data historian in industrial automation?", "Automation & PLC", "Medium",
    "A data historian collects and stores time-series data from industrial processes at high rates for long periods. Features: data compression (store only changes), high-speed ingestion (thousands of tags per second), long-term storage (years), trend visualization, and analytics. Used for: process optimization, quality control, regulatory compliance, and troubleshooting. Examples: OSIsoft PI, Wonderware Historian, InfluxDB."),
  makeQ("What is the difference between discrete and process manufacturing?", "Automation & PLC", "Easy",
    "Discrete manufacturing: produces distinct, countable items (cars, electronics, appliances). Uses PLCs, assembly lines, robotic arms. Process manufacturing: produces materials in bulk (chemicals, food, pharmaceuticals). Uses DCS, continuous control, flow/temperature/pressure regulation. Batch manufacturing (beer, paint) bridges both. Different automation strategies, instruments, and control paradigms."),

  // ═══════════════════════════════════════════════════════════════
  // SIGNAL PROCESSING — FINAL BATCH (10)
  // ═══════════════════════════════════════════════════════════════
  makeQ("What is a Hilbert transform?", "Signal Processing", "Hard",
    "The Hilbert transform shifts all frequency components of a signal by -90 degrees. Combined with the original signal, it creates an analytic signal (complex-valued) whose magnitude is the instantaneous amplitude (envelope) and angle is the instantaneous phase. Used for: AM demodulation, envelope detection, instantaneous frequency estimation, and single-sideband modulation."),
  makeQ("What is a comb filter?", "Signal Processing", "Medium",
    "A comb filter has a frequency response with regularly-spaced notches or peaks (like the teeth of a comb). Created by adding a signal to a delayed version of itself: y[n] = x[n] + α·x[n-D]. Feedforward type creates notches; feedback type creates peaks. Used in: audio effects (flanging, chorus), multi-path echo cancellation, and harmonic analysis."),
  makeQ("What is the Goertzel algorithm?", "Signal Processing", "Medium",
    "Goertzel is an efficient algorithm for computing a single DFT bin (single frequency component) without computing the full FFT. More efficient than FFT when you need only a few frequency bins. Uses recursive computation: O(N) per frequency bin vs O(N log N) for full FFT. Used for: DTMF tone detection, frequency-selective power measurement, and spectrum analysis of specific frequencies."),
  makeQ("What is a polyphase filter?", "Signal Processing", "Hard",
    "A polyphase filter decomposes a single FIR filter into multiple sub-filters (phases) that operate at a lower rate. This is the efficient way to implement interpolation and decimation — avoiding the wasteful approach of filtering then discarding samples. Reduces computation by the decimation/interpolation factor. Essential for: multi-rate signal processing, software-defined radio, and audio sample rate conversion."),
  makeQ("What is CFAR (Constant False Alarm Rate) detection?", "Signal Processing", "Hard",
    "CFAR is a detection algorithm that adapts its threshold based on the local noise estimate around a cell under test. This maintains a constant false alarm probability regardless of varying noise levels. Used in: radar signal processing, sonar, and any system detecting signals in non-stationary noise. Types: Cell-Averaging CFAR (CA-CFAR), Greatest-Of CFAR (GO-CFAR), and Ordered-Statistics CFAR (OS-CFAR)."),

  // ═══════════════════════════════════════════════════════════════
  // POWER ELECTRONICS — FINAL BATCH (10)
  // ═══════════════════════════════════════════════════════════════
  makeQ("What is the difference between a linear power supply and a switching power supply?", "Power Electronics", "Easy",
    "Linear: uses a transformer (for AC-DC), rectifier, and linear regulator. Simple, low noise, but bulky and inefficient (excess energy wasted as heat). Switching: uses high-frequency switching + inductor/transformer to convert voltage efficiently (80-95%). Smaller, lighter, more efficient, but generates switching noise. Modern embedded systems almost always use switching supplies, with LDOs for noise-sensitive circuits."),
  makeQ("What is a snubber circuit?", "Power Electronics", "Medium",
    "A snubber is an RC or RCD network placed across a switch or diode to suppress voltage spikes and reduce switching stress. When an inductive load is switched off, the collapsing field creates a voltage spike (V = L·di/dt). The snubber absorbs this energy. Used in: relay contacts (arc suppression), MOSFET switching, motor drives, and transformer secondaries. Reduces EMI and prevents component damage."),
  makeQ("What is a current mode vs voltage mode control in switching regulators?", "Power Electronics", "Hard",
    "Voltage mode: the error amplifier compares output voltage to reference; the control loop adjusts duty cycle. Single feedback loop. Current mode: an inner loop senses inductor current (peak or average), providing faster response to load changes, inherent overcurrent protection, and simpler loop compensation. Current mode is preferred for most applications. Voltage mode is simpler for low-cost designs."),
  makeQ("What is the Joule effect and why does it matter in power design?", "Power Electronics", "Easy",
    "Joule heating (P = I²R) is heat generated when current flows through a resistance. In power design: trace resistance causes heating (size traces for current), connector resistance causes voltage drop and heat, MOSFET Rds(on) causes conduction losses, and sense resistors dissipate power. All power path resistances must be considered in the thermal budget. Higher current = exponentially more heat."),
  makeQ("What is load regulation vs line regulation?", "Power Electronics", "Easy",
    "Load regulation: how much the output voltage changes when load current changes (from no-load to full-load). Line regulation: how much output changes when input voltage changes. Both expressed as percentage or mV change. Good regulation: < 1%. Key specs for power supply quality. LDOs typically have excellent load regulation; switching regulators depend on control loop design."),

  // ═══════════════════════════════════════════════════════════════
  // BEHAVIORAL — FINAL BATCH (15)
  // ═══════════════════════════════════════════════════════════════
  makeQ("Why are you interested in embedded systems engineering?", "Behavioral", "Easy",
    "Be genuine about what drew you to the field: the tangible nature of building things that interact with the physical world, the challenge of working within resource constraints, the intersection of hardware and software, seeing your code make a motor move or a sensor read. Share a specific moment that sparked your interest. Show passion and genuine curiosity about how things work at the hardware level."),
  makeQ("Where do you see embedded systems going in the next 5-10 years?", "Behavioral", "Medium",
    "Discuss trends you're genuinely excited about: AI at the edge (TinyML), RISC-V becoming mainstream, wireless everywhere (Matter, WiFi HaLow), security becoming first-class (PSA Certified, SESIP), Rust in embedded (memory safety), digital twins and predictive maintenance, edge computing replacing some cloud workloads, and increasing safety requirements (autonomous vehicles, medical devices). Show you follow industry trends."),
  makeQ("Tell me about a time you had to make a decision with incomplete information.", "Behavioral", "Medium",
    "STAR format. In embedded, this is common: choosing a component before the full spec is finalized, deciding on a communication protocol early in design, or picking an MCU before knowing exact resource requirements. Show: how you gathered what information you could, made reasonable assumptions (documented!), built in flexibility for changes, and updated the decision as more information became available."),
  makeQ("How do you approach reading a datasheet for a new component?", "Behavioral", "Easy",
    "Structure your approach: 1) Start with the overview/features for a high-level understanding. 2) Check absolute maximum ratings (don't exceed these!). 3) Read the electrical characteristics table for operating conditions. 4) Study the functional description and block diagram. 5) Review the application circuit/typical configuration. 6) Note errata. Don't read cover-to-cover — use the table of contents to find what you need."),
  makeQ("Describe a time when you had to balance quality with speed of delivery.", "Behavioral", "Medium",
    "STAR format. Show pragmatism: identify the minimum quality bar (safety, reliability, core functionality), communicate trade-offs to stakeholders, cut scope (not corners) when under pressure, build technical debt consciously (document what needs improvement later), and plan for iteration. The best answer shows you delivered something good enough on time while maintaining a clear plan for improvements."),
  makeQ("How do you handle a situation where you realize your design approach is wrong mid-project?", "Behavioral", "Hard",
    "STAR format. Key elements: how you recognized the problem (testing, analysis, or feedback), how you evaluated the options (pivot vs push through), how you communicated the situation (be transparent about cost/schedule impact), and what you learned. Show: intellectual honesty (admitting the mistake), decisiveness (don't sink-cost fallacy), and professionalism (focus on the best path forward, not blame)."),
  makeQ("What questions would you ask the interviewer about this role?", "Behavioral", "Easy",
    "Good questions show thoughtfulness: What does a typical project lifecycle look like here? What MCU families/tools does the team use? How does the team handle code reviews and testing? What's the ratio of new development to maintenance? How do hardware and software teams collaborate? What's the biggest technical challenge the team is facing? What does career growth look like for an embedded engineer here?"),
];
