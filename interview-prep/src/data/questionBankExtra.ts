import { Question } from "@/context/AppContext";

let idCounter = 5000;
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

export const QUESTION_BANK_EXTRA: Question[] = [

  // ═══════════════════════════════════════════════════════════════
  // MORE EMBEDDED C/C++ (50)
  // ═══════════════════════════════════════════════════════════════
  makeQ("What is the difference between a macro and an inline function?", "Embedded C/C++", "Medium",
    "Macros are preprocessor text substitutions — no type checking, can cause double evaluation (e.g., MAX(i++, j)). Inline functions are real functions with type safety, proper scoping, and debuggability. Prefer inline functions in modern C. Macros are still useful for: conditional compilation, stringification (#), and token pasting (##)."),
  makeQ("How do you reverse the bits of a byte in C?", "Embedded C/C++", "Medium",
    "Multiple approaches: 1) Loop and shift: swap bits from ends toward middle. 2) Lookup table: pre-compute reversed values for all 256 bytes — fastest. 3) Divide and conquer bit tricks. Example: b = ((b & 0xF0)>>4)|((b & 0x0F)<<4); then swap pairs of 2 bits, then pairs of 1 bit. Common in communication protocols where bit ordering differs."),
  makeQ("What is the difference between a segmentation fault and a bus error?", "Embedded C/C++", "Medium",
    "Segfault (SIGSEGV): accessing memory you don't have permission to access (protected region, invalid address). Bus error (SIGBUS): accessing valid memory but with wrong alignment (e.g., reading a 32-bit int from an odd address on architectures that require alignment). On Cortex-M: both map to HardFault or BusFault/MemManage with different status register flags."),
  makeQ("What is a sentinel value and how is it used?", "Embedded C/C++", "Easy",
    "A sentinel is a special value that marks the end of a data structure or sequence. Examples: null terminator '\\0' in C strings, 0xFFFFFFFF as an invalid ID, -1 as an error return. In embedded: used in command tables (last entry has NULL function pointer), configuration arrays, and linked list terminators. Choose values that can't appear in normal data."),
  makeQ("What are the differences between C and C++ relevant to embedded?", "Embedded C/C++", "Medium",
    "C++: classes/encapsulation, templates, RAII (constructors/destructors for resource management), namespaces, references, overloading, and STL. Concerns in embedded C++: exception handling overhead (often disabled), RTTI size cost, template code bloat, virtual function vtable overhead, and dynamic memory in STL containers. 'Embedded C++' subsets avoid expensive features. Many embedded projects now use C++ effectively."),
  makeQ("What is RAII and how is it useful in embedded C++?", "Embedded C/C++", "Hard",
    "RAII (Resource Acquisition Is Initialization): acquire resources in constructor, release in destructor. The compiler guarantees the destructor runs when the object goes out of scope — even if an exception occurs. In embedded: use for mutex lock/unlock (ScopedLock), interrupt disable/enable, peripheral power on/off, and DMA channel management. Prevents resource leaks."),
  makeQ("What is a flexible array member in C99?", "Embedded C/C++", "Medium",
    "A struct can have an unsized array as its last member: struct msg { uint8_t len; uint8_t data[]; }; Allocated with malloc(sizeof(struct msg) + data_size). The array uses memory immediately after the struct. Used in: variable-length protocol messages, packets, and buffers. Must be allocated dynamically or in a pre-sized buffer. Cannot be used on the stack."),
  makeQ("How do you count the number of set bits in an integer?", "Embedded C/C++", "Medium",
    "Methods: 1) Loop and count: while(n) { count += n & 1; n >>= 1; }. 2) Brian Kernighan's trick: while(n) { n &= (n-1); count++; } — clears one bit per iteration, O(number of set bits). 3) Lookup table for each byte. 4) ARM __builtin_popcount() or RBIT+CLZ instructions. Common in: bitmap processing, error checking, and resource allocation masks."),
  makeQ("What is the offsetof() macro?", "Embedded C/C++", "Medium",
    "offsetof(type, member) returns the byte offset of a member within a struct. Defined in <stddef.h>. Implementation: ((size_t)&((type *)0)->member). Used for: generic linked lists (container_of macro), serialization, and understanding struct layout with padding. Essential for low-level data structure manipulation in embedded."),
  makeQ("What is the container_of macro commonly used in Linux kernel?", "Embedded C/C++", "Hard",
    "#define container_of(ptr, type, member) ((type *)((char *)(ptr) - offsetof(type, member))). Given a pointer to a struct member, it returns a pointer to the containing struct. Used extensively in: Linux kernel linked lists, driver frameworks, and generic data structures where callbacks receive a pointer to an embedded struct member."),
  makeQ("What happens when you cast an integer to a pointer type?", "Embedded C/C++", "Medium",
    "The integer is interpreted as a memory address. Useful in embedded for accessing hardware registers at known addresses: volatile uint32_t *reg = (volatile uint32_t *)0x40021000; Dangerous if the address is invalid — causes undefined behavior (fault on protected systems, corruption on unprotected). Always use volatile for hardware register pointers."),
  makeQ("What is a memory barrier and when do you need one?", "Embedded C/C++", "Hard",
    "A memory barrier (fence) prevents the compiler and/or CPU from reordering memory accesses across the barrier. __DSB() (Data Synchronization Barrier): completes all memory accesses before continuing. __DMB() (Data Memory Barrier): ensures ordering but doesn't wait for completion. __ISB() (Instruction Synchronization Barrier): flushes pipeline. Needed when: writing to peripheral registers in sequence, configuring MPU, or before/after DMA."),
  makeQ("What is the 'weak' attribute in GCC?", "Embedded C/C++", "Medium",
    "__attribute__((weak)) allows a symbol to be overridden by a non-weak definition. Used in: default ISR handlers (weak handlers point to infinite loop; user can override with real handler), library default implementations that users can customize, and HAL callback functions. If no strong definition exists, the weak one is used."),
  makeQ("How do you detect integer overflow in C?", "Embedded C/C++", "Hard",
    "C doesn't trap on overflow (undefined behavior for signed, wraps for unsigned). Detection: 1) Pre-check: if (a > INT_MAX - b) overflow will occur. 2) Use compiler builtins: __builtin_add_overflow(a, b, &result). 3) Use wider types for intermediate calculations: int64_t temp = (int64_t)a + b. Critical in embedded for: sensor calculations, timer arithmetic, and buffer size calculations."),
  makeQ("What is the difference between a tight loop and a cooperative loop in embedded?", "Embedded C/C++", "Easy",
    "Tight loop: while(1) { if(flag) process(); } — constantly running, polls everything, simple but wastes power. Cooperative loop: while(1) { task1(); task2(); __WFI(); } — runs tasks in sequence, then sleeps until next interrupt. Saves power. More structured: super loop with timer-based task scheduling. This is the simplest embedded architecture before moving to RTOS."),
  makeQ("What is XOR swap and is it practical?", "Embedded C/C++", "Easy",
    "XOR swap exchanges two values without a temporary: a ^= b; b ^= a; a ^= b; It works but is NOT recommended: same performance or worse than temp-variable swap on modern CPUs (pipeline stalls, no instruction-level parallelism), undefined if a and b are the same variable, and harder to read. Use a temporary variable — the compiler optimizes it anyway."),

  // ═══════════════════════════════════════════════════════════════
  // MORE RTOS (30)
  // ═══════════════════════════════════════════════════════════════
  makeQ("What is the tick rate in FreeRTOS and how do you choose it?", "RTOS & Scheduling", "Easy",
    "The tick rate (configTICK_RATE_HZ) determines the RTOS time resolution. Typical: 1000Hz (1ms resolution). Higher rate = finer timing but more CPU overhead from tick ISR. Lower rate = less overhead but coarser timing. For most applications, 1000Hz is fine. For very low power, reduce to 100Hz or use tickless idle mode."),
  makeQ("What is tickless idle mode in FreeRTOS?", "RTOS & Scheduling", "Hard",
    "Normally, the tick ISR fires every 1ms even if all tasks are blocked — wasting power. Tickless idle suppresses tick interrupts during idle, programs a wake-up timer for the next task deadline, and adjusts the tick count on wake-up. This allows deep sleep for extended periods. Essential for battery-powered RTOS applications. Enabled with configUSE_TICKLESS_IDLE."),
  makeQ("What is a software timer vs a hardware timer?", "RTOS & Scheduling", "Easy",
    "Hardware timer: physical peripheral, generates interrupts, limited count on MCU (e.g., 4-8 timers). Very precise. Software timer: managed by RTOS using the tick ISR, unlimited count, less precise (resolution = tick period), callback runs in timer task context (not ISR). Use hardware timers for precise timing/PWM; software timers for application timeouts and periodic actions."),
  makeQ("How does xSemaphoreTake with timeout work?", "RTOS & Scheduling", "Easy",
    "xSemaphoreTake(sem, timeout) blocks the calling task until: 1) The semaphore is given (returns pdTRUE), or 2) The timeout expires (returns pdFALSE). portMAX_DELAY = wait forever. 0 = non-blocking check. This prevents indefinite blocking and helps detect faults (e.g., a peripheral that never responds). Always use timeouts in production code."),
  makeQ("What is a stream buffer in FreeRTOS?", "RTOS & Scheduling", "Medium",
    "A stream buffer passes a continuous stream of bytes between tasks or from ISR to task (unlike a queue which passes discrete items). One writer, one reader. Trigger level: reader blocks until N bytes are available. Ideal for: UART receive buffering, audio data streams, and any byte-oriented data flow. More memory-efficient than queues for byte streams."),
  makeQ("What is a message buffer in FreeRTOS?", "RTOS & Scheduling", "Medium",
    "A message buffer is built on stream buffers but preserves message boundaries. Each write includes a 4-byte length header, so the reader gets complete messages. One writer, one reader. Useful for: passing variable-length protocol packets, command structures, or log entries between tasks. Unlike queues (fixed-size items), message buffers handle varying sizes efficiently."),
  makeQ("What is the idle hook in FreeRTOS?", "RTOS & Scheduling", "Easy",
    "The idle hook (vApplicationIdleHook) is a user-defined function called from the idle task on every idle loop iteration. Use for: feeding the watchdog, entering low-power mode, calculating CPU usage, or background cleanup. Rules: must NOT block or call any blocking API. Must be short — it delays the idle task from entering sleep."),
  makeQ("What is configASSERT in FreeRTOS?", "RTOS & Scheduling", "Easy",
    "configASSERT(x) is a debug macro that checks a condition and halts if false. Used internally by FreeRTOS to catch: invalid parameters, API misuse (e.g., calling blocking API from ISR), stack overflow, and incorrect interrupt priorities. Define it to trigger a breakpoint or error handler during development. Can be disabled in release for performance."),
  makeQ("How do you calculate CPU utilization in FreeRTOS?", "RTOS & Scheduling", "Medium",
    "Enable runtime stats (configGENERATE_RUN_TIME_STATS). FreeRTOS tracks time each task spends running using a high-resolution counter. vTaskGetRunTimeStats() or uxTaskGetSystemState() provides per-task execution time. CPU usage = task_time / total_time * 100%. The idle task's percentage is 'wasted' CPU. Useful for: performance optimization, sizing, and overload detection."),
  makeQ("What is a direct-to-task notification vs a semaphore for ISR-to-task signaling?", "RTOS & Scheduling", "Medium",
    "Task notifications: ~45% faster than semaphores, no need to create a separate object, smaller RAM footprint. But: only work for one specific task (no broadcast), no waiting queue of multiple tasks, and limited functionality (can't count higher than ULONG_MAX). Use task notifications for simple ISR→task wake-up; semaphores when multiple tasks might wait or when decoupling is needed."),
  makeQ("What is stack overflow and how does it manifest in embedded systems?", "RTOS & Scheduling", "Medium",
    "Stack overflow occurs when a task uses more stack space than allocated. Symptoms: random crashes, corrupted variables, overwritten adjacent task control blocks, or watchdog resets. On RTOS: adjacent task's stack gets corrupted, causing hard-to-trace bugs. Detection: MPU guard region, canary values, high-water mark checking. Prevention: analyze call depth, avoid large local arrays, use static analysis (-fstack-usage)."),

  // ═══════════════════════════════════════════════════════════════
  // MORE DIGITAL LOGIC & CIRCUITS (25)
  // ═══════════════════════════════════════════════════════════════
  makeQ("What is an adder? Explain half-adder and full-adder.", "Digital Logic & Circuits", "Easy",
    "Half-adder: adds two 1-bit inputs (A, B). Sum = A XOR B, Carry = A AND B. No carry input. Full-adder: adds three inputs (A, B, Carry-in). Sum = A XOR B XOR Cin, Cout = (A AND B) OR (Cin AND (A XOR B)). Full-adders chain together for multi-bit addition (ripple-carry adder). Building block of all arithmetic circuits."),
  makeQ("What is a counter circuit? Describe different types.", "Digital Logic & Circuits", "Easy",
    "A counter is a sequential circuit that goes through a sequence of states. Types: Binary up counter (counts 0,1,2,...,2^n-1), down counter (counts backward), modulo-N counter (counts to N-1 then resets), ring counter (one-hot shifting), Johnson counter (twisted ring). Synchronous counters (all flip-flops clocked together, faster) vs asynchronous/ripple (cascade clocks, simpler but slower)."),
  makeQ("What is a comparator circuit?", "Digital Logic & Circuits", "Easy",
    "A comparator has two inputs (A, B) and outputs indicating A>B, A=B, or A<B. For 1-bit: A>B = A AND NOT B, A<B = NOT A AND B, A=B = A XNOR B. Multi-bit comparators cascade or use iterative comparison from MSB. In analog: a voltage comparator outputs high/low based on which analog input is larger. Used in: ADC, sorting networks, and threshold detection."),
  makeQ("What is a register file?", "Digital Logic & Circuits", "Medium",
    "A register file is a collection of registers with read/write ports, addressed by register number. CPU register files have multiple read ports (for operands) and one or more write ports (for results). Implemented as a small, fast SRAM-like structure. ARM has 16 general-purpose registers (R0-R15) in its register file. Register file design is a key factor in processor performance."),
  makeQ("What is a FIFO pointer and how do full/empty detection work?", "Digital Logic & Circuits", "Medium",
    "A FIFO has write pointer (wr_ptr) and read pointer (rd_ptr). Empty: wr_ptr == rd_ptr. Full: wr_ptr has wrapped around and caught up to rd_ptr. Distinguish full vs empty by: using an extra MSB bit (pointers are N+1 bits; full when MSBs differ but lower bits match), or tracking count, or using Gray-coded pointers for async FIFOs."),
  makeQ("What is a one-hot encoding?", "Digital Logic & Circuits", "Easy",
    "One-hot encoding uses one flip-flop per state, with exactly one bit set at a time. 4 states = 4 flip-flops (0001, 0010, 0100, 1000). Advantages: simple next-state logic (each transition is one AND gate), fast (short combinational paths), glitch-free outputs. Disadvantage: uses more flip-flops than binary encoding. Preferred in FPGAs where flip-flops are plentiful."),
  makeQ("What is the difference between FPGA and ASIC?", "Digital Logic & Circuits", "Medium",
    "FPGA: Field-Programmable Gate Array — reconfigurable hardware, programmed after manufacturing, fast time-to-market, good for prototyping and low-to-medium volume. ASIC: Application-Specific Integrated Circuit — custom silicon, cannot be changed after fabrication, high NRE cost but lowest per-unit cost at volume, best performance and power efficiency. Use FPGA for < ~100K units; ASIC for mass production."),
  makeQ("What is a testbench in digital design?", "Digital Logic & Circuits", "Medium",
    "A testbench is HDL code that simulates and verifies a design. It instantiates the DUT (Device Under Test), generates stimulus (clock, inputs), checks outputs against expected values, and reports pass/fail. Components: clock generator, reset sequence, test vectors, assertions, and coverage metrics. Written in SystemVerilog, VHDL, or using frameworks like UVM/cocotb."),
  makeQ("What is setup and hold time violation? What happens?", "Digital Logic & Circuits", "Medium",
    "Setup violation: data changes too close to the clock edge (not stable long enough before). Hold violation: data changes too soon after the clock edge. Both cause metastability — the flip-flop output may oscillate between 0 and 1 before settling to an unpredictable value. Setup violations: reduce clock frequency or add pipeline stages. Hold violations: add delay buffers."),
  makeQ("What is the difference between asynchronous and synchronous FIFO?", "Digital Logic & Circuits", "Hard",
    "Synchronous FIFO: same clock for read and write sides. Simpler design, standard pointer comparison. Asynchronous FIFO: different clocks for read and write sides (clock domain crossing). Uses Gray-coded pointers synchronized across domains with 2-stage synchronizers. More complex but essential when data crosses clock boundaries. Critical design element in multi-clock systems."),

  // ═══════════════════════════════════════════════════════════════
  // MORE COMMUNICATION PROTOCOLS (30)
  // ═══════════════════════════════════════════════════════════════
  makeQ("What is a CAN message frame format?", "Communication Protocols", "Medium",
    "Standard CAN frame: SOF (1 bit), Arbitration field (11-bit ID + RTR), Control (DLC — data length 0-8), Data (0-8 bytes), CRC (15-bit + delimiter), ACK (1 bit + delimiter), EOF (7 recessive bits). Extended frame has 29-bit ID. CAN FD extends data field to 64 bytes and allows higher bit rate in data phase. The ID determines message priority during arbitration."),
  makeQ("What is CAN FD and how does it differ from classic CAN?", "Communication Protocols", "Hard",
    "CAN FD (Flexible Data-rate): extends classic CAN with larger payloads (up to 64 bytes vs 8) and faster data phase (up to 8 Mbps vs 1 Mbps for arbitration). Uses BRS (Bit Rate Switch) to toggle between arbitration and data bit rates. Backward-compatible with classic CAN on the same bus (with restrictions). Reduces bus load by carrying more data per frame."),
  makeQ("What is the difference between I2C and SMBus?", "Communication Protocols", "Medium",
    "SMBus (System Management Bus) is based on I2C but with tighter specifications: defined timeout (35ms), limited frequency (10-100kHz), specific voltage thresholds, mandatory timeout on clock stretching, and defined protocols for common operations (battery management, sensors). SMBus devices work on I2C buses but not always vice versa. Used in PC motherboards for power management."),
  makeQ("How does SPI work with multiple slaves?", "Communication Protocols", "Easy",
    "Two approaches: 1) Individual CS lines — master has one CS per slave, activates only the target slave. Simple but uses many GPIO pins. 2) Daisy-chain — MOSI→slave1→slave2→...→MISO, all share one CS. Data shifts through all slaves. First slave gets data last. Used in: LED drivers (APA102), DAC chains. Choose based on: number of slaves, speed requirements, and available GPIO."),
  makeQ("What is the acknowledge mechanism in CAN bus?", "Communication Protocols", "Medium",
    "After a transmitting node sends the CRC, it transmits a recessive (1) ACK bit. If any receiving node has received the frame correctly, it drives the ACK bit dominant (0). The transmitter checks: if ACK is dominant, at least one node received OK. If ACK remains recessive, no node acknowledged — the transmitter flags an error and retransmits."),
  makeQ("What is a UART FIFO and why is it useful?", "Communication Protocols", "Easy",
    "Many UART peripherals have hardware FIFOs (typically 16-64 bytes) that buffer received/transmitted data. Benefits: reduces interrupt frequency (interrupt when FIFO reaches threshold instead of every byte), prevents data loss at high baud rates, and allows CPU to handle bursts. Configure FIFO trigger level based on your latency vs throughput needs."),
  makeQ("What is auto-baud detection in UART?", "Communication Protocols", "Medium",
    "Auto-baud detection automatically determines the sender's baud rate by measuring the timing of a known character (often 'U' = 0x55, which creates alternating 0/1 pattern, or a break character). The receiver measures pulse widths and calculates the baud rate. Useful in: bootloaders that need to work at any baud rate, and auto-configuring systems."),
  makeQ("What is a multiprocessor communication mode in UART?", "Communication Protocols", "Medium",
    "Some UART peripherals support addressing multiple slaves on the same bus. Methods: 9th-bit address marking (9th bit = 1 means address byte, 0 means data), or idle-line detection (idle period separates frames). Only the addressed slave wakes up to receive data. Others stay in mute mode. Used in: RS-485 multi-drop networks."),
  makeQ("What is the difference between TCP and UDP for embedded IoT?", "Communication Protocols", "Medium",
    "TCP: connection-oriented, reliable delivery (retransmits lost packets), ordered, flow/congestion control. Higher overhead, more memory (connection state). UDP: connectionless, no delivery guarantee, no ordering, minimal overhead. For IoT: UDP for sensor telemetry (lost reading is OK), MQTT/HTTP over TCP for reliable messaging, CoAP over UDP for constrained devices. Consider: power cost of TCP keepalives."),
  makeQ("What is TLS/SSL and why is it important for IoT?", "Communication Protocols", "Hard",
    "TLS (Transport Layer Security) encrypts and authenticates network communication. Essential for IoT to prevent: eavesdropping on sensor data, man-in-the-middle attacks, unauthorized device commands, and firmware tampering. Challenges in embedded: large code footprint, RAM for handshake, CPU for crypto. Solutions: hardware crypto accelerators, smaller cipher suites, pre-shared keys, and libraries like mbedTLS or wolfSSL."),
  makeQ("What is the difference between synchronous and asynchronous serial communication?", "Communication Protocols", "Easy",
    "Synchronous: data is sent with an accompanying clock signal (SPI, I2C). Both sides use the same clock for timing. More reliable, higher speeds possible. Asynchronous: no shared clock (UART). Both sides must agree on baud rate. Uses start/stop bits for framing. Simpler wiring but baud rate mismatch causes errors."),
  makeQ("What are the advantages of differential signaling?", "Communication Protocols", "Medium",
    "Differential signaling uses two wires carrying equal and opposite signals. The receiver reads the voltage difference, rejecting common-mode noise that affects both wires equally. Advantages: much better noise immunity, can work at higher speeds over longer distances, and lower EMI (equal and opposite currents cancel radiated fields). Examples: RS-485, CAN, USB, LVDS, Ethernet."),

  // ═══════════════════════════════════════════════════════════════
  // MORE MICROCONTROLLERS (30)
  // ═══════════════════════════════════════════════════════════════
  makeQ("What is a watchdog window timer vs a standard watchdog?", "Microcontrollers", "Medium",
    "Standard watchdog: must be fed before it expires (any time is OK). Window watchdog: must be fed within a specific time window — not too early, not too late. Feeding too early also triggers a reset. This catches: programs running too fast (skipping code), as well as programs that hang. STM32 has both IWDG (standard, independent clock) and WWDG (window, APB clock)."),
  makeQ("What is a DMA circular mode?", "Microcontrollers", "Medium",
    "In circular mode, the DMA channel automatically restarts from the beginning of the buffer when it reaches the end, creating a continuous circular buffer. The CPU is notified via half-transfer and transfer-complete interrupts. Ideal for: continuous ADC sampling (always filling a buffer), audio playback/capture, and continuous UART reception. No CPU intervention needed between transfers."),
  makeQ("What is the difference between DMA normal mode and circular mode?", "Microcontrollers", "Easy",
    "Normal mode: DMA transfers a specified number of items then stops. CPU must reconfigure and restart for the next transfer. Circular mode: DMA automatically wraps around and continues forever, overwriting old data. Use normal for: one-shot transfers (SPI packet). Use circular for: continuous streaming (ADC sampling, audio)."),
  makeQ("What is the I-cache and D-cache on Cortex-M7?", "Microcontrollers", "Hard",
    "Cortex-M7 has optional instruction cache (I-cache) and data cache (D-cache) to compensate for slow Flash access. I-cache: caches instructions, transparent to software, always safe to enable. D-cache: caches data, improves read/write performance, BUT requires cache maintenance (clean/invalidate) when sharing memory with DMA (DMA doesn't go through cache). Use MPU to mark DMA buffers as non-cacheable."),
  makeQ("What is the Cortex-M SysTick timer and how is it configured?", "Microcontrollers", "Medium",
    "SysTick is a 24-bit decrementing counter. Registers: SYST_CSR (enable, interrupt enable, clock source), SYST_RVR (reload value), SYST_CVR (current value), SYST_CALIB (calibration). For 1ms tick with 72MHz clock: SYST_RVR = 72000 - 1. When counter hits 0, it reloads and optionally generates SysTick interrupt. Used as RTOS tick source."),
  makeQ("How do you generate a precise delay without blocking in embedded?", "Microcontrollers", "Medium",
    "Options: 1) Hardware timer interrupt — set timer, ISR fires after delay, non-blocking. 2) RTOS software timer or vTaskDelayUntil. 3) SysTick-based timestamp comparison: record start time, check elapsed in main loop. 4) DMA completion — start transfer, DMA interrupt signals when done. Avoid busy-wait delay loops — they waste CPU and aren't precise if interrupts occur."),
  makeQ("What is a GPIO open-drain output?", "Microcontrollers", "Medium",
    "Open-drain: the GPIO can actively pull the pin low (connect to ground through MOSFET) but cannot drive it high. The pin floats when not driving low — requires an external pull-up resistor to provide the high level. Used for: I2C (wired-AND allows multiple drivers), interrupt lines (multiple sources OR'ed), level shifting (pull-up to different voltage), and LED driving (active-low)."),
  makeQ("What is a brownout reset (BOR) and power-on reset (POR)?", "Microcontrollers", "Easy",
    "POR: resets the MCU when power is first applied, ensuring clean startup with all registers at default values. BOR: resets the MCU if supply voltage drops below a critical threshold (e.g., 2.7V for a 3.3V MCU) during operation. BOR prevents erratic behavior from operating at insufficient voltage. Both are typically built into the MCU with configurable thresholds."),
  makeQ("What is the difference between an analog comparator and an ADC?", "Microcontrollers", "Easy",
    "Analog comparator: outputs a single bit — is the input above or below a reference voltage? Fast, simple, used for threshold detection, zero-crossing, and wake-from-sleep triggers. ADC: converts analog voltage to a multi-bit digital value representing the voltage level. Slower but provides actual measured value. Use comparator when you only need above/below; ADC when you need the actual value."),
  makeQ("What is clock security system (CSS) on STM32?", "Microcontrollers", "Medium",
    "CSS monitors the HSE (external high-speed oscillator). If HSE fails (crystal broken, trace disconnected), CSS automatically switches the system clock to HSI (internal oscillator) and generates an NMI interrupt. This prevents the MCU from halting if the external crystal fails. The NMI handler should: log the event, reconfigure peripherals for the new clock, and optionally alert the user."),
  makeQ("What is backup domain (VBAT) on an MCU?", "Microcontrollers", "Easy",
    "The backup domain is a small section of the MCU powered by the VBAT pin (typically connected to a coin cell battery). It contains: RTC (Real-Time Clock), backup SRAM (20-4096 bytes), and backup registers. These retain data even when main power (VDD) is off. Used for: keeping time, storing wake-up reason, and preserving small amounts of critical data across power cycles."),
  makeQ("What is a bus fault and what causes it?", "Microcontrollers", "Medium",
    "A bus fault on ARM Cortex-M occurs when: accessing an invalid memory address, accessing a peripheral that's not clocked (forgot to enable the peripheral clock — very common!), accessing a memory region that doesn't exist, or a DMA transfer to an invalid address. Debug by reading BFSR (Bus Fault Status Register) and BFAR (Bus Fault Address Register) to identify the offending address."),
  makeQ("What is the option bytes (OB) on STM32?", "Microcontrollers", "Hard",
    "Option bytes are a special Flash region storing MCU configuration: read/write protection levels, BOR threshold, watchdog configuration (hardware vs software), boot mode selection, and user configuration bits. Modified via Flash programming interface. Some settings (like RDP Level 2) are irreversible. Critical for: production configuration, security, and boot behavior."),

  // ═══════════════════════════════════════════════════════════════
  // MORE PCB & HARDWARE DESIGN (25)
  // ═══════════════════════════════════════════════════════════════
  makeQ("What is a solder paste stencil?", "PCB & Hardware Design", "Easy",
    "A stencil is a thin metal sheet with apertures matching SMD pads on the PCB. Solder paste is spread across the stencil, depositing precisely measured amounts on each pad. The stencil is removed, components are placed, and the board goes through reflow. Aperture design (size, shape) affects solder joint quality. Essential for consistent SMD assembly."),
  makeQ("What is reflow soldering vs wave soldering?", "PCB & Hardware Design", "Easy",
    "Reflow: solder paste is applied (stencil), components placed, board heated in an oven following a temperature profile (preheat → soak → reflow → cool). Used for SMD. Wave soldering: the board passes over a wave of molten solder. Used for through-hole components. Mixed boards: reflow SMD first, then wave-solder through-hole. Most modern boards are primarily reflow."),
  makeQ("What is BOM (Bill of Materials) and why is it important?", "PCB & Hardware Design", "Easy",
    "The BOM lists all components needed to build the product: part numbers, quantities, values, packages, suppliers, and costs. A well-maintained BOM is essential for: accurate manufacturing quotes, component procurement, assembly instructions, supply chain management, and cost optimization. Include alternates for critical components in case of shortages."),
  makeQ("What is design for manufacturing (DFM) in PCB design?", "PCB & Hardware Design", "Medium",
    "DFM considers manufacturing constraints during design: minimum trace/space widths, via sizes and drill aspect ratios, pad sizes for reliable soldering, component clearances for assembly equipment, fiducial marks for pick-and-place alignment, panelization for efficient production, and testability (test points, bed-of-nails access). Following DFM rules reduces defects and manufacturing cost."),
  makeQ("What is the difference between single-ended and differential impedance?", "PCB & Hardware Design", "Hard",
    "Single-ended impedance: characteristic impedance of one trace relative to ground plane (typically 50Ω). Differential impedance: impedance between two traces of a differential pair (typically 90Ω or 100Ω). Differential impedance depends on: trace width, spacing between traces, dielectric thickness, and dielectric constant. Use impedance calculators or 2D field solvers for accurate values."),
  makeQ("What is a copper pour/fill and when should you use it?", "PCB & Hardware Design", "Easy",
    "A copper pour fills unused PCB area with copper, connected to a net (usually GND). Benefits: improved ground return path, reduced EMI, better thermal management, and reduced etching time (less copper removed). Avoid isolated copper islands (antenna effect). Connect pours to ground with multiple vias. Don't pour under sensitive analog sections if it creates noise coupling."),
  makeQ("What is a QFP vs QFN vs BGA package?", "PCB & Hardware Design", "Medium",
    "QFP (Quad Flat Package): leads extending from all four sides, visible solder joints (easy inspection), larger footprint. QFN (Quad Flat No-leads): pads under the package edge, smaller footprint, better thermal performance (exposed pad), lower inductance. BGA (Ball Grid Array): solder balls under the entire package, highest pin count in smallest area, best for high-speed, requires X-ray inspection."),
  makeQ("What is annular ring and why does it matter?", "PCB & Hardware Design", "Easy",
    "The annular ring is the copper pad area surrounding a drilled hole (via or through-hole pad). Ring width = (pad diameter - drill diameter) / 2. Too small: drill misalignment breaks the connection (reliability issue). PCB fabricators specify minimum annular ring (typically 0.1-0.15mm). Larger rings are more reliable but use more space. IPC standards define requirements by class."),
  makeQ("What is the purpose of a silkscreen layer on a PCB?", "PCB & Hardware Design", "Easy",
    "Silkscreen (legend) is the printed text and symbols on the PCB surface: component designators (R1, C3, U2), pin 1 markers, test point labels, board name/version, polarity indicators, and assembly instructions. Helps with: manual assembly, debugging, inspection, and maintenance. Keep text away from solder pads to prevent contamination. Use consistent size and orientation."),

  // ═══════════════════════════════════════════════════════════════
  // MORE AUTOMATION & PLC (20)
  // ═══════════════════════════════════════════════════════════════
  makeQ("What is a servo drive and how does it work?", "Automation & PLC", "Medium",
    "A servo drive is a power amplifier that controls a servo motor based on position/velocity/torque commands. It receives commands from a PLC or motion controller, reads feedback from the motor's encoder, and adjusts current/voltage to track the commanded profile. Closed-loop operation: position loop → velocity loop → current loop (innermost, fastest). Used for precise motion control."),
  makeQ("What is a soft PLC?", "Automation & PLC", "Medium",
    "A soft PLC is PLC software running on a standard PC or embedded computer (instead of dedicated PLC hardware). Advantages: more processing power, standard OS (Linux/Windows), easy network integration, lower hardware cost. Disadvantages: less deterministic timing (unless using real-time OS), less robust hardware, different certification requirements. Examples: CODESYS on embedded Linux, Beckhoff TwinCAT."),
  makeQ("What is structured text (ST) in PLC programming?", "Automation & PLC", "Medium",
    "Structured Text is a high-level PLC programming language similar to Pascal. It supports: variables, IF/THEN/ELSE, CASE, FOR/WHILE loops, functions, and function blocks. Better than ladder logic for: complex math, string processing, data manipulation, and algorithms. Example: IF temperature > 80.0 THEN coolingValve := TRUE; END_IF. Part of IEC 61131-3 standard."),
  makeQ("What is motion control and what is an axis?", "Automation & PLC", "Medium",
    "Motion control precisely manages the position, velocity, and acceleration of mechanical systems. An axis is one independently controlled motion dimension (e.g., a robot arm joint, a CNC machine's X/Y/Z). Motion controllers coordinate multiple axes for synchronized movement (interpolation). Key concepts: velocity profile (trapezoidal, S-curve), electronic gearing, homing, and limit switches."),
  makeQ("What is EtherNet/IP?", "Automation & PLC", "Medium",
    "EtherNet/IP (Ethernet/Industrial Protocol) uses standard Ethernet hardware with CIP (Common Industrial Protocol) for real-time industrial communication. Supports: implicit messaging (cyclic I/O data via UDP) and explicit messaging (configuration/diagnostics via TCP). Compatible with standard network infrastructure. Used heavily in Allen-Bradley/Rockwell systems. Not to be confused with Ethernet IP addressing."),
  makeQ("What is a safety function like emergency stop (E-stop)?", "Automation & PLC", "Easy",
    "E-stop is a safety function that brings a machine to a safe state when activated. Requirements: hardwired (not software-only), NC (normally closed) contacts (fail-safe), dual-channel redundant circuits, cannot be used for normal stopping, requires manual reset to restart, and must meet applicable safety standard (ISO 13850). The safety circuit must be independent of the control system."),
  makeQ("What is IEC 62443 and how does it relate to industrial automation?", "Automation & PLC", "Hard",
    "IEC 62443 is the cybersecurity standard for Industrial Automation and Control Systems (IACS). It covers: security risk assessment, system architecture (zones and conduits), component security requirements, and security lifecycle management. Increasingly important as industrial systems connect to networks and cloud. Requires: network segmentation, access control, monitoring, and incident response."),

  // ═══════════════════════════════════════════════════════════════
  // MORE SIGNAL PROCESSING (15)
  // ═══════════════════════════════════════════════════════════════
  makeQ("What is a notch filter (band-stop filter)?", "Signal Processing", "Easy",
    "A notch filter rejects a narrow band of frequencies while passing all others. Used to remove specific interference: 50/60Hz power line noise from sensor signals, mechanical resonance frequencies, or specific interfering tones. Implemented as IIR (efficient, steep notch) or FIR (linear phase). Adaptive notch filters can track varying interference frequencies."),
  makeQ("What is the difference between linear and nonlinear filters?", "Signal Processing", "Medium",
    "Linear filters (FIR, IIR) satisfy superposition: output of sum = sum of outputs. They can only modify frequency content. Nonlinear filters: median filter (removes impulse noise better than averaging), morphological filters, and adaptive filters. Nonlinear filters can remove noise types that linear filters cannot. Example: median filter removes salt-and-pepper noise without blurring edges."),
  makeQ("What is sample-and-hold?", "Signal Processing", "Easy",
    "A sample-and-hold (S/H) circuit captures an analog voltage at a specific instant and holds it constant while the ADC converts it. Without S/H, the input could change during conversion, causing errors. Most ADC modules have built-in S/H. Key specs: acquisition time (how long to charge), droop rate (how fast the held voltage decays), and aperture jitter (timing uncertainty)."),
  makeQ("What is the difference between analog and digital filtering in embedded?", "Signal Processing", "Medium",
    "Analog filters: applied before ADC (anti-aliasing is mandatory), handle high frequencies beyond ADC bandwidth, simple passive components (RC), no delay for real-time. Digital filters: applied after ADC, flexible (easily changed in software), can implement complex responses, perfect reproducibility, but limited by sampling rate and processing power. Best approach: analog anti-aliasing filter + digital processing filter."),
  makeQ("What is jitter in sampling and how does it affect ADC performance?", "Signal Processing", "Hard",
    "Sampling jitter is timing variation in the ADC sampling instant. Effect: at frequency f with jitter σt, SNR ≤ -20log(2πf·σt). Higher signal frequencies are more affected. Example: 1ps jitter limits a 10MHz signal to ~84dB SNR. Sources: clock source phase noise, power supply noise, and digital switching noise coupling to analog. Mitigation: clean clock source, dedicated ADC clock, proper grounding."),

  // ═══════════════════════════════════════════════════════════════
  // MORE POWER ELECTRONICS (15)
  // ═══════════════════════════════════════════════════════════════
  makeQ("What is a synchronous rectifier?", "Power Electronics", "Medium",
    "A synchronous rectifier replaces the freewheeling diode in a switching converter with a MOSFET. The MOSFET's on-resistance (milliohms) causes much less voltage drop than a diode (0.3-0.7V), improving efficiency — especially at low output voltages and high currents. Requires precise timing control to prevent shoot-through. Used in high-efficiency buck converters and laptop power supplies."),
  makeQ("What is input/output capacitor ESR and why does it matter?", "Power Electronics", "Medium",
    "ESR (Equivalent Series Resistance) is the internal resistance of a capacitor. High ESR causes: voltage ripple (ΔV = I·ESR), power dissipation (P = I²·ESR), and reduced filtering effectiveness at high frequencies. Ceramic capacitors have very low ESR (milliohms); electrolytics have higher ESR but more capacitance. Use low-ESR ceramics near switching regulators; bulk electrolytics for energy storage."),
  makeQ("What is a gate driver and why is it needed?", "Power Electronics", "Medium",
    "A gate driver provides sufficient current to rapidly charge/discharge a MOSFET's gate capacitance. MCU GPIO can't source enough current for fast switching (the gate capacitance of a power MOSFET can be several nanofarads). Slow switching → high switching losses → heat. Gate drivers also provide: level shifting for high-side MOSFETs, dead-time insertion, and isolation (in some cases)."),
  makeQ("What is the difference between continuous and discontinuous conduction mode (CCM/DCM)?", "Power Electronics", "Hard",
    "CCM: inductor current never reaches zero during a switching cycle. Voltage relationship is continuous (Vout = D·Vin for buck). Higher efficiency at heavy loads. DCM: inductor current falls to zero before next switch cycle. Voltage depends on load. Simpler control (inherently stable), lower losses at light loads. Many converters operate in CCM at heavy load and transition to DCM at light load."),
  makeQ("What is inrush current and how do you limit it?", "Power Electronics", "Easy",
    "Inrush current is the initial surge of current when a power supply is first connected — caused by charging empty capacitors. Can be 10-100× normal operating current. Mitigation: NTC thermistor in series (high resistance when cold, drops as it heats up), active inrush limiting circuit (MOSFET + soft-start), pre-charge circuit, or current-limited power supply. Without limiting, inrush can trip fuses or damage connectors."),

  // ═══════════════════════════════════════════════════════════════
  // MORE SYSTEM DESIGN (30)
  // ═══════════════════════════════════════════════════════════════
  makeQ("How do you design a reliable field communication link?", "System Design", "Hard",
    "Considerations: physical layer (RS-485 for noise immunity, or wireless for cable-free), protocol with CRC error detection, ACK/NACK/retry mechanism, sequence numbers for duplicate detection, timeout handling, graceful degradation (buffer data if link is down), framing (COBS or byte-stuffing to find message boundaries), and monitoring (link quality metrics, error rate logging). Test with noise injection and cable disconnection."),
  makeQ("What is a software architecture for a bare-metal embedded system?", "System Design", "Medium",
    "Common patterns: 1) Super loop — while(1) { task1(); task2(); } Simple but hard to manage timing. 2) Timer-based cooperative — timer ISR sets flags, main loop checks flags and runs tasks. Better timing control. 3) Event-driven — events queued, main loop dispatches handlers. Most flexible. 4) Round-robin with interrupts — ISRs for urgent work, background tasks in main loop. Choose based on timing requirements and complexity."),
  makeQ("How do you handle configuration data in embedded systems?", "System Design", "Medium",
    "Storage options: compile-time #defines (simplest, requires reflash to change), Flash-stored parameters (read at boot, updated via bootloader or application), EEPROM/FRAM (byte-erasable, higher endurance), external storage (SD card, SPI Flash). Design: store with CRC, have factory defaults, support versioned formats, wear-level EEPROM writes, and provide a way to reset to defaults."),
  makeQ("What is a panic handler in embedded firmware?", "System Design", "Medium",
    "A panic handler runs when an unrecoverable error occurs (HardFault, stack overflow, failed assertion). It should: save diagnostic info (fault registers, stack trace, error code) to non-volatile memory, log the event (UART, Flash), optionally blink an error LED pattern, and reset the system (watchdog or NVIC_SystemReset). On next boot, the bootloader can report the crash and send diagnostics."),
  makeQ("What is FMEA and how is it applied to embedded systems?", "System Design", "Hard",
    "FMEA (Failure Mode and Effects Analysis): systematically identify potential failures, their causes, effects, severity, and likelihood. For each failure mode, calculate Risk Priority Number (RPN = Severity × Occurrence × Detection). Prioritize mitigation for high-RPN items. In embedded: sensor failure → fallback to backup sensor or safe default. Communication loss → timeout and retry. Power failure → save state to NVRAM."),
  makeQ("How would you design an embedded system for harsh environments?", "System Design", "Hard",
    "Considerations: wide temperature range components (-40 to +85°C industrial), conformal coating for moisture/contamination protection, vibration-resistant connectors (locking, no ribbon cables), EMC compliance (filtered power, shielded enclosure), watchdog for software recovery, error-correcting memory, redundant communication paths, and extensive testing (thermal cycling, vibration testing, salt spray)."),
  makeQ("What is a digital twin in embedded/IoT context?", "System Design", "Hard",
    "A digital twin is a virtual model of a physical device that mirrors its real-time state using sensor data. Uses: remote monitoring, predictive maintenance (simulate wear), what-if analysis, commissioning (test control logic before deployment), and training operators. Implemented with: cloud services (AWS IoT Twin Maker, Azure Digital Twins), physics models, and ML. The embedded device sends telemetry; the twin provides insights."),
  makeQ("What is edge computing in IoT?", "System Design", "Medium",
    "Edge computing processes data locally (on or near the device) rather than sending everything to the cloud. Benefits: lower latency (real-time decisions), reduced bandwidth (only send summaries), works offline, better privacy (data stays local). Implementation: run inference on MCU (TinyML), gateway-level processing, or local server. Trade-off: limited compute resources vs cloud scalability."),
  makeQ("What is TinyML and how is it used in embedded?", "System Design", "Hard",
    "TinyML runs machine learning models on microcontrollers (KB-MB of memory, milliwatts of power). Use cases: keyword spotting, gesture recognition, anomaly detection, predictive maintenance, and image classification. Tools: TensorFlow Lite Micro, Edge Impulse, STM32Cube.AI. Models are trained on PC/cloud, quantized to int8, and deployed to MCU. Enables always-on intelligent sensing without cloud connectivity."),
  makeQ("How do you implement a reliable data logging system?", "System Design", "Medium",
    "Key design decisions: storage medium (SPI Flash, SD card, EEPROM), file system (LittleFS, FatFS, raw), writing strategy (buffer in RAM, flush periodically or on event), wear leveling (distribute writes across memory), data format (binary for space efficiency, CSV for readability), timestamps (RTC), and recovery (handle power loss mid-write using atomic commits or journaling). Size the storage for expected data rate and lifetime."),
  makeQ("What is a hardware abstraction layer (HAL) and should you write your own?", "System Design", "Medium",
    "A HAL provides a portable API over hardware-specific registers. Benefits: portability across MCUs, easier unit testing (mock the HAL), cleaner application code. Trade-offs: overhead, complexity, may not expose all hardware features. Vendor HALs (STM32 HAL, NXP SDK) are convenient but thick. Writing a thin custom HAL for just the peripherals you use can be the best balance of portability and efficiency."),
  makeQ("What is the difference between blocking and non-blocking I/O?", "System Design", "Easy",
    "Blocking: function waits until the operation completes (e.g., HAL_UART_Transmit waits until all bytes sent). Simple but wastes CPU time. Non-blocking: function starts the operation and returns immediately; completion is signaled via callback, interrupt, or polling a status flag (e.g., HAL_UART_Transmit_IT). More efficient but more complex to manage. Use non-blocking for: long transfers, multi-tasking, and responsive systems."),
];
