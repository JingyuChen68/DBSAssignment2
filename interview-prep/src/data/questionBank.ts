import { Question } from "@/context/AppContext";

// A comprehensive bank of embedded systems, hardware, and automation interview questions
// sourced and compiled from industry interview guides.

let idCounter = 1000;
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

export const QUESTION_BANK: Question[] = [
  // ═══════════════════════════════════════════════════════════════
  // EMBEDDED C/C++
  // ═══════════════════════════════════════════════════════════════
  makeQ(
    "What does the 'volatile' keyword do in C and when should you use it?",
    "Embedded C/C++",
    "Easy",
    "The volatile keyword tells the compiler not to optimize accesses to a variable because its value may change unexpectedly — such as hardware registers, variables modified by ISRs, or memory-mapped I/O. Without volatile, the compiler might cache the value in a register and miss external changes.",
    "Classic embedded interview question. Always mention ISRs and hardware registers."
  ),
  makeQ(
    "What is the difference between a wild pointer and a dangling pointer?",
    "Embedded C/C++",
    "Easy",
    "A wild pointer is uninitialized and points to an arbitrary/random memory location. A dangling pointer previously pointed to a valid object that has since been freed or gone out of scope. Both can cause undefined behavior if dereferenced.",
    ""
  ),
  makeQ(
    "Explain the use of 'const' and 'volatile' together in embedded C.",
    "Embedded C/C++",
    "Medium",
    "A variable declared 'const volatile' means the program cannot modify it (const), but its value can still change externally (volatile). A common use case is a read-only hardware status register: the software should not write to it, but the hardware can change it at any time, so the compiler must re-read it each access.",
    ""
  ),
  makeQ(
    "What is a function pointer and how is it used in embedded systems?",
    "Embedded C/C++",
    "Medium",
    "A function pointer stores the address of a function and allows calling it indirectly. In embedded systems, function pointers are used in interrupt vector tables, callback mechanisms, state machine dispatch tables, and command parsers to allow flexible, modular code.",
    ""
  ),
  makeQ(
    "What are the differences between stack and heap memory?",
    "Embedded C/C++",
    "Easy",
    "Stack memory is LIFO, automatically managed, used for local variables and function calls, and is fast but limited in size. Heap memory is dynamically allocated (malloc/free), more flexible but slower, and prone to fragmentation. In embedded systems, heap usage is often avoided due to fragmentation and non-deterministic allocation times.",
    ""
  ),
  makeQ(
    "How do you set, clear, and toggle a specific bit in a register?",
    "Embedded C/C++",
    "Easy",
    "Set bit n: REG |= (1 << n). Clear bit n: REG &= ~(1 << n). Toggle bit n: REG ^= (1 << n). Check bit n: if (REG & (1 << n)). These are fundamental bitwise operations used constantly in register-level embedded programming.",
    "Practice writing these without looking — they come up in every embedded interview."
  ),
  makeQ(
    "What is the purpose of the 'static' keyword in C? Give all its uses.",
    "Embedded C/C++",
    "Easy",
    "1) Static local variable: retains its value between function calls. 2) Static global variable: limits scope to the file (internal linkage). 3) Static function: limits visibility to the file. In embedded systems, static is used to encapsulate module-private state and functions.",
    ""
  ),
  makeQ(
    "What is pointer arithmetic and how does it work in C?",
    "Embedded C/C++",
    "Medium",
    "When you add an integer n to a pointer, the address advances by n * sizeof(pointed-to type). For example, if int *p points to address 0x1000 and int is 4 bytes, p+1 = 0x1004. This is used in array traversal, buffer manipulation, and memory-mapped peripheral access.",
    ""
  ),
  makeQ(
    "Explain the difference between #define and const for defining constants in embedded C.",
    "Embedded C/C++",
    "Easy",
    "#define is a preprocessor text replacement — no type checking, no memory allocated, can cause subtle bugs. const declares a typed, scoped variable — the compiler enforces types, and in some cases the value can be placed in read-only flash memory. const is generally preferred in modern embedded C.",
    ""
  ),
  makeQ(
    "What are bitfields in C structs? When are they useful and what are the pitfalls?",
    "Embedded C/C++",
    "Medium",
    "Bitfields allow you to specify the number of bits a struct member uses, useful for mapping hardware registers or saving memory. Pitfalls: bit ordering is implementation-defined (varies by compiler/platform), padding rules vary, and they're not portable across architectures. For portable register access, explicit bit masking is safer.",
    ""
  ),
  makeQ(
    "What is memory-mapped I/O vs port-mapped I/O?",
    "Embedded C/C++",
    "Medium",
    "Memory-mapped I/O: peripheral registers are assigned addresses in the same address space as RAM, accessed with normal load/store instructions. Port-mapped I/O: uses special instructions (like IN/OUT on x86) to access a separate I/O address space. ARM uses memory-mapped I/O exclusively.",
    ""
  ),
  makeQ(
    "What is the 'restrict' keyword in C99?",
    "Embedded C/C++",
    "Hard",
    "The restrict qualifier tells the compiler that a pointer is the only way to access the memory it points to — no other pointer aliases it. This allows the compiler to make aggressive optimizations. Commonly used in DSP and performance-critical embedded code to enable vectorization and loop optimizations.",
    ""
  ),
  makeQ(
    "What are the dangers of using malloc/free in embedded systems?",
    "Embedded C/C++",
    "Medium",
    "Heap fragmentation over time (especially on long-running systems), non-deterministic allocation time (bad for real-time), potential memory leaks, and the overhead of heap management. Alternatives include static allocation, memory pools, and stack allocation. Many safety-critical standards (MISRA) prohibit dynamic allocation.",
    ""
  ),
  makeQ(
    "How does typedef differ from #define for creating type aliases?",
    "Embedded C/C++",
    "Easy",
    "typedef creates a proper type alias with compiler type-checking and scoping. #define is simple text substitution with no type safety. typedef handles complex types (function pointers, arrays) more clearly. Example: typedef void (*callback_t)(int); is cleaner than the equivalent #define.",
    ""
  ),
  makeQ(
    "What is the difference between a struct and a union in C?",
    "Embedded C/C++",
    "Easy",
    "A struct allocates memory for all members (total size is sum of members + padding). A union shares memory among all members (total size is the size of the largest member). Unions are used in embedded systems for type punning, protocol parsing, and register overlay where different interpretations of the same memory are needed.",
    ""
  ),
  makeQ(
    "Explain endianness. How do you handle it in embedded systems?",
    "Embedded C/C++",
    "Medium",
    "Big-endian stores the MSB at the lowest address; little-endian stores the LSB first. ARM can be configured for either (most ARM Cortex-M are little-endian). You handle it by using byte-swapping functions (htonl/ntohl), bitfield caution, and serialization routines that explicitly define byte order for communication protocols.",
    ""
  ),
  makeQ(
    "What is an inline function? When should you use it in embedded C?",
    "Embedded C/C++",
    "Easy",
    "An inline function suggests the compiler replace the call with the function body to avoid call overhead. Useful for small, frequently-called functions (like bit manipulation helpers). Trade-off: can increase code size (bad for flash-limited MCUs) but improves speed. The compiler may ignore the hint.",
    ""
  ),
  makeQ(
    "What are the alignment and padding rules in C structs, and why do they matter in embedded?",
    "Embedded C/C++",
    "Hard",
    "Compilers insert padding bytes so members are aligned to their natural boundary (e.g., 4-byte int at 4-byte aligned address). This matters for: memory-mapped peripheral registers (must match hardware layout), communication protocol packets (use __attribute__((packed)) carefully), and memory optimization on constrained devices.",
    ""
  ),
  makeQ(
    "What is a linker script and why is it important in embedded development?",
    "Embedded C/C++",
    "Hard",
    "A linker script defines the memory layout: where code (.text), initialized data (.data), uninitialized data (.bss), and the stack go in physical memory (Flash, RAM). It's essential for embedded because you must explicitly control what goes where — the startup code uses it to copy .data from Flash to RAM and zero .bss.",
    ""
  ),
  makeQ(
    "How do you implement a circular/ring buffer in C?",
    "Embedded C/C++",
    "Medium",
    "Use a fixed-size array with head and tail indices that wrap around using modulo (or bitwise AND if size is power of 2). Write advances head, read advances tail. Buffer is full when (head + 1) % size == tail, empty when head == tail. Ring buffers are critical in embedded for UART RX/TX, ADC sample buffering, and producer-consumer patterns.",
    "Be prepared to code this on a whiteboard."
  ),

  // ═══════════════════════════════════════════════════════════════
  // RTOS & SCHEDULING
  // ═══════════════════════════════════════════════════════════════
  makeQ(
    "What is the difference between a mutex and a semaphore?",
    "RTOS & Scheduling",
    "Medium",
    "A mutex has ownership — only the task that locked it can unlock it. It's used for mutual exclusion of shared resources. A semaphore is a signaling mechanism with a counter — any task can post/signal it. Binary semaphores signal events; counting semaphores manage pools. Mutexes also support priority inheritance to avoid priority inversion.",
    "One of the most asked RTOS questions. Always mention ownership and priority inheritance."
  ),
  makeQ(
    "What is priority inversion and how do you solve it?",
    "RTOS & Scheduling",
    "Hard",
    "Priority inversion occurs when a high-priority task is blocked waiting for a resource held by a low-priority task, while a medium-priority task preempts the low-priority one — effectively inverting priorities. Solutions: Priority Inheritance Protocol (temporarily raise the low-priority task's priority) or Priority Ceiling Protocol (assign ceiling priority to each mutex).",
    "The Mars Pathfinder bug is a famous real-world example of priority inversion."
  ),
  makeQ(
    "What is the difference between preemptive and cooperative scheduling?",
    "RTOS & Scheduling",
    "Easy",
    "Preemptive: the scheduler can interrupt a running task to run a higher-priority task at any time (tick-based or event-based). Cooperative: tasks voluntarily yield the CPU — no task is interrupted. Preemptive is standard in RTOS for real-time guarantees. Cooperative is simpler but a misbehaving task can starve others.",
    ""
  ),
  makeQ(
    "What is a deadlock? How do you prevent it?",
    "RTOS & Scheduling",
    "Medium",
    "Deadlock occurs when two or more tasks are each waiting for a resource held by the other, creating a circular dependency. Four conditions (Coffman): mutual exclusion, hold and wait, no preemption, circular wait. Prevention: enforce a strict lock ordering, use timeouts on lock attempts, or use a single lock for shared resources.",
    ""
  ),
  makeQ(
    "Explain the difference between hard real-time and soft real-time systems.",
    "RTOS & Scheduling",
    "Easy",
    "Hard real-time: missing a deadline is a system failure (e.g., airbag deployment, ABS braking). Soft real-time: missing a deadline degrades quality but isn't catastrophic (e.g., video streaming, UI updates). Hard real-time requires deterministic worst-case execution time analysis.",
    ""
  ),
  makeQ(
    "What is Rate Monotonic Scheduling (RMS)?",
    "RTOS & Scheduling",
    "Hard",
    "RMS is a fixed-priority preemptive scheduling algorithm where tasks with shorter periods get higher priority. It's optimal among fixed-priority algorithms. Schedulability test: total CPU utilization must be ≤ n(2^(1/n) - 1). For large n, this approaches ln(2) ≈ 69.3%. Used in hard real-time system analysis.",
    ""
  ),
  makeQ(
    "What are message queues in an RTOS and when would you use them?",
    "RTOS & Scheduling",
    "Medium",
    "Message queues allow tasks to send data to each other asynchronously via a FIFO buffer managed by the RTOS. The sender posts messages, and the receiver blocks until a message is available (or polls). Used for: decoupling producers and consumers, passing data from ISRs to tasks (since ISRs can't block), and inter-task communication.",
    ""
  ),
  makeQ(
    "What is a task/thread control block (TCB)?",
    "RTOS & Scheduling",
    "Medium",
    "A TCB is a data structure the RTOS maintains for each task, containing: task state (running/ready/blocked), priority, stack pointer, program counter, CPU register context, and pointers for scheduling queues. The context switch saves/restores the TCB to switch between tasks.",
    ""
  ),
  makeQ(
    "What is the difference between a binary semaphore and a mutex?",
    "RTOS & Scheduling",
    "Medium",
    "Both can protect resources, but: a mutex has ownership (only the locker can unlock), supports priority inheritance, and is meant for mutual exclusion. A binary semaphore has no ownership (any task can give/take), no priority inheritance, and is better used for signaling/synchronization. Using a binary semaphore for resource protection risks priority inversion.",
    ""
  ),
  makeQ(
    "What is a context switch and what happens during one?",
    "RTOS & Scheduling",
    "Medium",
    "A context switch saves the state (registers, PC, SP, status flags) of the currently running task to its TCB, then loads the state of the next task to run. Triggered by: tick interrupt, higher-priority task becoming ready, or the current task blocking. Context switches have overhead and their frequency affects system performance.",
    ""
  ),
  makeQ(
    "What is the idle task in an RTOS?",
    "RTOS & Scheduling",
    "Easy",
    "The idle task is the lowest-priority task that runs when no other task is ready. It typically puts the CPU into a low-power sleep mode (WFI instruction on ARM) to save energy. It can also be used for background housekeeping like checking stack usage or feeding a watchdog.",
    ""
  ),
  makeQ(
    "What is a watchdog timer and how is it used?",
    "RTOS & Scheduling",
    "Easy",
    "A watchdog timer is a hardware countdown timer that resets the system if it's not periodically 'fed' (reset/kicked). If software hangs or enters an infinite loop, the watchdog expires and triggers a system reset. Best practice: each critical task should contribute to feeding the watchdog, so a hung task is detected.",
    ""
  ),
  makeQ(
    "Explain task states in a typical RTOS.",
    "RTOS & Scheduling",
    "Easy",
    "Common states: Running (executing on CPU), Ready (eligible to run, waiting for scheduler), Blocked/Waiting (waiting for an event, semaphore, or delay), Suspended (explicitly paused by another task or itself). The scheduler picks the highest-priority Ready task to transition to Running.",
    ""
  ),
  makeQ(
    "What is a spinlock and when is it appropriate to use one?",
    "RTOS & Scheduling",
    "Hard",
    "A spinlock busy-waits (loops) until a lock is available, consuming CPU cycles. Appropriate in multi-core systems for very short critical sections where context switch overhead exceeds spin time. Inappropriate in single-core systems (the lock holder can't run while the spinner wastes CPU). In single-core embedded, use mutexes that block the task instead.",
    ""
  ),
  makeQ(
    "What is FreeRTOS? Describe its key features.",
    "RTOS & Scheduling",
    "Easy",
    "FreeRTOS is a popular open-source, lightweight RTOS for microcontrollers. Key features: preemptive/cooperative/time-sliced scheduling, tasks, queues, semaphores, mutexes, software timers, event groups, and tick-based time management. It supports many architectures (ARM Cortex-M, RISC-V, etc.) and has a small memory footprint.",
    ""
  ),
  makeQ(
    "What is the difference between vTaskDelay and vTaskDelayUntil in FreeRTOS?",
    "RTOS & Scheduling",
    "Medium",
    "vTaskDelay delays for a specified number of ticks from the call time — so total period varies with task execution time. vTaskDelayUntil delays until an absolute tick count, providing a precise periodic wake-up regardless of task execution time. Use vTaskDelayUntil for periodic tasks that need consistent timing.",
    ""
  ),
  makeQ(
    "What is an event group/flag in an RTOS?",
    "RTOS & Scheduling",
    "Medium",
    "An event group is a set of bits that tasks can set, clear, and wait on. A task can block until specific bits (events) are set — either any one of them (OR) or all of them (AND). Useful for synchronizing multiple events from different sources before proceeding, like waiting for both sensor data ready AND communication link established.",
    ""
  ),
  makeQ(
    "How do you debug an RTOS-based system?",
    "RTOS & Scheduling",
    "Hard",
    "Techniques: Use RTOS-aware debuggers that show task states and stacks. Add tracing tools (Tracealyzer, SystemView) to visualize task execution, context switches, and API calls. Check stack high-water marks for overflow. Use logging to UART with timestamps. Watch for common issues: priority inversion, deadlocks, stack overflow, race conditions.",
    ""
  ),

  // ═══════════════════════════════════════════════════════════════
  // DIGITAL LOGIC & CIRCUITS
  // ═══════════════════════════════════════════════════════════════
  makeQ(
    "What is the difference between a latch and a flip-flop?",
    "Digital Logic & Circuits",
    "Easy",
    "A latch is level-sensitive — it's transparent when the enable signal is active, passing input to output. A flip-flop is edge-triggered — it captures input only on the rising or falling edge of the clock. Flip-flops are preferred in synchronous digital design because they provide predictable timing.",
    ""
  ),
  makeQ(
    "What are setup time and hold time?",
    "Digital Logic & Circuits",
    "Medium",
    "Setup time: the minimum time before the clock edge that data must be stable. Hold time: the minimum time after the clock edge that data must remain stable. Violating either causes metastability — the flip-flop output may oscillate or settle to an unpredictable value. These constrain maximum clock frequency.",
    ""
  ),
  makeQ(
    "What is metastability and how do you mitigate it?",
    "Digital Logic & Circuits",
    "Hard",
    "Metastability occurs when a flip-flop's setup/hold times are violated, causing the output to remain in an unstable state for an indeterminate time. Mitigation: use a synchronizer chain (2+ flip-flops in series) when crossing clock domains or sampling asynchronous signals. The probability of remaining metastable decreases exponentially with each stage.",
    ""
  ),
  makeQ(
    "Explain the difference between Moore and Mealy state machines.",
    "Digital Logic & Circuits",
    "Medium",
    "Moore machine: outputs depend only on the current state. Mealy machine: outputs depend on current state AND current inputs. Moore machines need more states but outputs are more stable (change only on clock edges). Mealy machines can respond faster (output changes with input) but may have glitches.",
    ""
  ),
  makeQ(
    "What is a multiplexer and how is it used?",
    "Digital Logic & Circuits",
    "Easy",
    "A multiplexer (MUX) selects one of N input signals and forwards it to the output based on select lines. A 2:1 MUX has 2 inputs, 1 select, 1 output. Used for data routing, bus arbitration, and implementing logic functions. Any Boolean function can be implemented with a MUX of appropriate size.",
    ""
  ),
  makeQ(
    "What is propagation delay and why does it matter?",
    "Digital Logic & Circuits",
    "Easy",
    "Propagation delay is the time for a change at the input of a logic gate to appear at the output. It limits the maximum operating frequency of a circuit. The critical path (longest propagation delay through combinational logic) determines the maximum clock speed: f_max = 1 / (t_prop + t_setup).",
    ""
  ),
  makeQ(
    "How do you design a frequency divider using flip-flops?",
    "Digital Logic & Circuits",
    "Medium",
    "Connect a T flip-flop (or D flip-flop with Q' fed back to D) to the clock. Each flip-flop divides frequency by 2. Cascading N flip-flops gives divide-by-2^N. For non-power-of-2 division, use a counter that resets at the desired count.",
    ""
  ),
  makeQ(
    "What is clock domain crossing (CDC) and why is it a problem?",
    "Digital Logic & Circuits",
    "Hard",
    "CDC occurs when a signal passes between two parts of a circuit running on different clocks. Without proper synchronization, the receiving flip-flop may sample during a transition, causing metastability. Solutions: 2-stage synchronizers for single-bit signals, Gray code for multi-bit counters, async FIFOs for data buses.",
    ""
  ),
  makeQ(
    "What is a Schmitt trigger and when is it used?",
    "Digital Logic & Circuits",
    "Medium",
    "A Schmitt trigger is a comparator with hysteresis — it has different thresholds for rising and falling transitions. Used to clean up noisy or slowly-changing signals into clean digital pulses. Common in: button debouncing circuits, noisy sensor signal conditioning, and square wave generation from sine waves.",
    ""
  ),
  makeQ(
    "What is glitch-free clock switching and why is it important?",
    "Digital Logic & Circuits",
    "Hard",
    "When switching between two clock sources, a naïve MUX can produce a glitch (short pulse) that causes flip-flops to clock incorrectly. Glitch-free switching uses a handshake mechanism: disable the current clock, wait for it to go low, enable the new clock. This ensures no runt pulses reach the clock tree.",
    ""
  ),
  makeQ(
    "Explain the difference between synchronous and asynchronous reset.",
    "Digital Logic & Circuits",
    "Medium",
    "Synchronous reset: the reset is sampled on the clock edge, so the circuit resets on the next clock. Asynchronous reset: the circuit resets immediately when the reset signal is asserted, regardless of the clock. Async reset is simpler but can cause metastability on de-assertion — use an async assert, sync de-assert pattern.",
    ""
  ),
  makeQ(
    "What is a Gray code and why is it used in CDC?",
    "Digital Logic & Circuits",
    "Medium",
    "Gray code is a binary encoding where adjacent values differ by only one bit. In clock domain crossings, multi-bit values can be sampled mid-transition, causing errors. Since Gray code changes only one bit at a time, sampling during a transition gives either the old or new value — never a garbage intermediate. Used in async FIFO pointers.",
    ""
  ),

  // ═══════════════════════════════════════════════════════════════
  // COMMUNICATION PROTOCOLS
  // ═══════════════════════════════════════════════════════════════
  makeQ(
    "Compare UART, SPI, and I2C communication protocols.",
    "Communication Protocols",
    "Medium",
    "UART: asynchronous, full-duplex, point-to-point, 2 wires (TX/RX), no clock. Baud rate must match. SPI: synchronous, full-duplex, master-slave, 4 wires (MOSI/MISO/SCK/CS), fastest of the three, one CS per slave. I2C: synchronous, half-duplex, multi-master multi-slave, 2 wires (SDA/SCL), uses addressing, slower but fewer wires.",
    "Draw a comparison table if asked on whiteboard."
  ),
  makeQ(
    "How does I2C addressing work?",
    "Communication Protocols",
    "Medium",
    "I2C uses 7-bit (or 10-bit) addresses. Communication starts with a START condition, then the master sends the 7-bit slave address plus 1 R/W bit. The addressed slave responds with ACK. Multiple devices share the same 2-wire bus, each with a unique address. Some address bits may be pin-configurable on ICs.",
    ""
  ),
  makeQ(
    "What is the CAN bus protocol and where is it used?",
    "Communication Protocols",
    "Medium",
    "CAN (Controller Area Network) is a robust, multi-master, message-based protocol designed for noisy environments. Uses differential signaling on 2 wires (CAN_H, CAN_L). Message-based (not address-based) — any node can broadcast, others filter by message ID. Features: priority arbitration, error detection (CRC, bit stuffing), automatic retransmission. Used in automotive, industrial automation, and medical devices.",
    ""
  ),
  makeQ(
    "What is the difference between SPI modes (CPOL and CPHA)?",
    "Communication Protocols",
    "Medium",
    "SPI has 4 modes based on CPOL (clock polarity) and CPHA (clock phase). CPOL=0: clock idle low; CPOL=1: clock idle high. CPHA=0: data sampled on leading edge; CPHA=1: data sampled on trailing edge. Mode 0 (CPOL=0,CPHA=0) is most common. Master and slave must agree on the same mode.",
    ""
  ),
  makeQ(
    "What is I2C clock stretching?",
    "Communication Protocols",
    "Medium",
    "Clock stretching is when a slave device holds the SCL line low to pause communication, signaling to the master that it needs more time to process data. The master must detect this and wait before continuing. Not all I2C masters support clock stretching, which can cause compatibility issues.",
    ""
  ),
  makeQ(
    "What is a baud rate and how does UART synchronize without a clock?",
    "Communication Protocols",
    "Easy",
    "Baud rate is the number of signal changes per second (e.g., 9600, 115200). UART synchronizes using start and stop bits: each frame begins with a start bit (logic low) that triggers the receiver to sample at the agreed baud rate. The receiver then samples each bit at the center of its timing window.",
    ""
  ),
  makeQ(
    "What is RS-232 vs RS-485? When would you choose one over the other?",
    "Communication Protocols",
    "Medium",
    "RS-232: single-ended, point-to-point, ±12V levels, short distance (~15m), one transmitter/one receiver. RS-485: differential signaling, multi-drop bus (up to 32 nodes), long distance (~1200m), half or full duplex, noise-resistant. Choose RS-485 for industrial/long-distance/multi-device; RS-232 for simple short-range connections.",
    ""
  ),
  makeQ(
    "What is DMA and how does it relate to communication protocols?",
    "Communication Protocols",
    "Medium",
    "DMA (Direct Memory Access) allows peripherals to transfer data to/from memory without CPU intervention. For protocols like SPI, UART, I2C — DMA can handle data transfer in the background while the CPU does other work. This improves throughput and reduces CPU load, especially for large or continuous data transfers.",
    ""
  ),
  makeQ(
    "Explain the Modbus protocol.",
    "Communication Protocols",
    "Medium",
    "Modbus is a serial communication protocol for industrial devices. Modbus RTU uses RS-485 with binary encoding; Modbus TCP runs over Ethernet. It uses a master-slave model with function codes for reading/writing registers and coils. Simple, open, and widely used in PLC communication, SCADA systems, and industrial sensors.",
    ""
  ),
  makeQ(
    "What is the difference between half-duplex and full-duplex communication?",
    "Communication Protocols",
    "Easy",
    "Full-duplex: both devices can transmit and receive simultaneously (e.g., SPI, UART with separate TX/RX lines). Half-duplex: devices take turns — only one can transmit at a time (e.g., I2C, RS-485 2-wire). Full-duplex has higher throughput but requires more wires.",
    ""
  ),
  makeQ(
    "What is USB and how does it differ from UART/SPI/I2C?",
    "Communication Protocols",
    "Hard",
    "USB is a complex, high-speed, host-controlled protocol with enumeration, descriptors, endpoints, and multiple transfer types (control, bulk, interrupt, isochronous). It uses differential signaling and supports hot-plug and power delivery. UART/SPI/I2C are simpler, lower-level protocols for board-level communication. USB is for external device connectivity.",
    ""
  ),
  makeQ(
    "What is EtherCAT and where is it used?",
    "Communication Protocols",
    "Hard",
    "EtherCAT (Ethernet for Control Automation Technology) is a real-time industrial Ethernet protocol. It processes frames 'on the fly' — each node reads/inserts data as the frame passes through, achieving very low latency. Used in high-performance industrial automation, motion control, and robotics where deterministic, microsecond-level timing is required.",
    ""
  ),

  // ═══════════════════════════════════════════════════════════════
  // MICROCONTROLLERS
  // ═══════════════════════════════════════════════════════════════
  makeQ(
    "What are the main components of a microcontroller?",
    "Microcontrollers",
    "Easy",
    "CPU core, program memory (Flash/ROM), data memory (SRAM), I/O ports (GPIO), timers/counters, ADC/DAC, communication peripherals (UART/SPI/I2C/CAN), interrupt controller (NVIC on ARM), clock system, and power management. Everything is integrated on a single chip.",
    ""
  ),
  makeQ(
    "What is the difference between a microcontroller and a microprocessor?",
    "Microcontrollers",
    "Easy",
    "A microprocessor is just the CPU — it needs external RAM, ROM, and peripherals (e.g., x86, ARM Cortex-A). A microcontroller integrates CPU + memory + peripherals on one chip (e.g., STM32, Arduino/ATmega). Microcontrollers are for embedded/dedicated tasks; microprocessors are for general-purpose computing.",
    ""
  ),
  makeQ(
    "Explain GPIO modes: input, output, alternate function, analog.",
    "Microcontrollers",
    "Easy",
    "Input: read external signals (with optional pull-up/pull-down). Output: drive signals high or low (push-pull or open-drain). Alternate Function: pin is controlled by a peripheral (UART TX, SPI clock, PWM, etc.). Analog: pin connects to ADC/DAC, digital buffer is disabled. Configured via GPIO registers.",
    ""
  ),
  makeQ(
    "What is the NVIC in ARM Cortex-M processors?",
    "Microcontrollers",
    "Medium",
    "NVIC (Nested Vectored Interrupt Controller) manages interrupts. Features: configurable priority levels, automatic context save/restore (stacking), tail-chaining (back-to-back interrupts without full context save), vector table for ISR addresses, and support for nested interrupts (higher-priority interrupts preempt lower-priority ones).",
    ""
  ),
  makeQ(
    "How does an ADC work? What are resolution and sampling rate?",
    "Microcontrollers",
    "Medium",
    "An ADC converts analog voltage to a digital number. Resolution (e.g., 12-bit) determines the number of discrete levels (4096 for 12-bit). Sampling rate (samples/second) determines how fast it converts. Common types: SAR (successive approximation — fast, moderate resolution), Sigma-Delta (slow, high resolution), Flash (very fast, low resolution).",
    ""
  ),
  makeQ(
    "What is PWM and how is it generated on a microcontroller?",
    "Microcontrollers",
    "Easy",
    "PWM (Pulse Width Modulation) is a digital signal with variable duty cycle used to control average power. Generated using a timer: the timer counts up to a period value, and the output pin goes high/low when the counter matches a compare value. Used for motor speed control, LED dimming, servo control, and DAC emulation.",
    ""
  ),
  makeQ(
    "What is the boot process of an ARM Cortex-M microcontroller?",
    "Microcontrollers",
    "Hard",
    "On reset: 1) CPU loads the initial stack pointer from address 0x00000000. 2) Loads the reset handler address from 0x00000004. 3) Jumps to the reset handler. 4) Reset handler initializes .data (copy from Flash to RAM), zeros .bss, calls SystemInit (configure clocks), then calls main(). The vector table at address 0 contains all ISR addresses.",
    ""
  ),
  makeQ(
    "What is the difference between polling and interrupt-driven I/O?",
    "Microcontrollers",
    "Easy",
    "Polling: CPU continuously checks a flag/status register in a loop — simple but wastes CPU time. Interrupt-driven: hardware signals the CPU when an event occurs, CPU jumps to ISR — efficient, allows CPU to do other work between events. Use polling for simple/fast checks; interrupts for asynchronous, unpredictable events.",
    ""
  ),
  makeQ(
    "What are the best practices for writing an ISR?",
    "Microcontrollers",
    "Medium",
    "Keep ISRs short and fast. Don't use blocking calls (delays, printf, malloc). Set a flag or post to a queue and handle heavy processing in the main loop/task. Declare shared variables as volatile. Be aware of reentrancy. Clear the interrupt flag. Minimize stack usage. Avoid calling non-reentrant library functions.",
    "Very commonly asked. Practice explaining with an example."
  ),
  makeQ(
    "What is DMA and when should you use it?",
    "Microcontrollers",
    "Medium",
    "DMA (Direct Memory Access) transfers data between memory and peripherals without CPU involvement. The CPU configures the DMA channel (source, destination, size, direction) and starts the transfer. DMA signals completion via interrupt. Use for: ADC continuous sampling, UART large transfers, SPI bulk data, memory-to-memory copies. Frees CPU for computation.",
    ""
  ),
  makeQ(
    "What are low-power modes on a microcontroller?",
    "Microcontrollers",
    "Medium",
    "MCUs offer multiple low-power modes with different trade-offs. Sleep: CPU stops, peripherals run. Stop: most clocks stopped, RAM retained, fast wake-up. Standby: only RTC/watchdog active, slowest wake-up. Wake-up sources include external interrupts, RTC alarms, watchdog, and specific peripheral events. Critical for battery-powered devices.",
    ""
  ),
  makeQ(
    "What is a bootloader in an MCU and why is it useful?",
    "Microcontrollers",
    "Medium",
    "A bootloader is a small program in Flash that runs before the main application. It can: update firmware over UART/USB/CAN/I2C (field updates without JTAG), verify application integrity (CRC check), select between multiple application images, and provide a recovery mechanism if the main application is corrupted.",
    ""
  ),

  // ═══════════════════════════════════════════════════════════════
  // PCB & HARDWARE DESIGN
  // ═══════════════════════════════════════════════════════════════
  makeQ(
    "What is a decoupling capacitor and where should it be placed?",
    "PCB & Hardware Design",
    "Easy",
    "A decoupling (bypass) capacitor filters high-frequency noise from power supply lines. Place as close as possible to the VCC/GND pins of ICs to minimize inductance in the path. Typical values: 100nF ceramic for high-frequency, plus 10µF bulk cap near power entry. Every IC should have its own decoupling capacitor.",
    ""
  ),
  makeQ(
    "What is the purpose of a ground plane in PCB design?",
    "PCB & Hardware Design",
    "Easy",
    "A ground plane provides: low-impedance return path for signals, reduced electromagnetic interference (EMI), better signal integrity, heat dissipation, and a reference for controlled-impedance traces. It should be unbroken under signal traces. Splits in the ground plane force return currents to take longer paths, increasing noise.",
    ""
  ),
  makeQ(
    "What is controlled impedance and why does it matter?",
    "PCB & Hardware Design",
    "Hard",
    "Controlled impedance means PCB traces are designed to have a specific characteristic impedance (e.g., 50Ω). At high frequencies, impedance mismatches cause signal reflections and ringing. Impedance depends on trace width, dielectric thickness, and material. Critical for: high-speed digital (DDR, USB, Ethernet), RF, and any signal where rise time is comparable to trace propagation delay.",
    ""
  ),
  makeQ(
    "Explain the difference between through-hole and surface-mount components.",
    "PCB & Hardware Design",
    "Easy",
    "Through-hole: leads go through holes in the PCB and are soldered on the other side. Larger, more robust mechanically, easier to prototype. Surface-mount (SMD): components are soldered directly to pads on the PCB surface. Smaller, allows higher density, better for high-speed (shorter leads = less inductance), standard for modern production.",
    ""
  ),
  makeQ(
    "What is a pull-up/pull-down resistor and when do you need one?",
    "PCB & Hardware Design",
    "Easy",
    "A pull-up resistor connects a signal line to VCC; pull-down connects to GND. They define a default state for floating inputs (e.g., button not pressed = high with pull-up). Needed for: open-drain/open-collector outputs (I2C SDA/SCL), unused inputs, bus idle states, and reset pins.",
    ""
  ),
  makeQ(
    "What is a 4-layer PCB stackup and how do you decide on one?",
    "PCB & Hardware Design",
    "Medium",
    "Common 4-layer stackup: Signal - Ground - Power - Signal. The ground and power planes provide return paths, shielding, and decoupling. Place high-speed signals on layers adjacent to the ground plane. Consider: signal integrity needs, number of signals, power distribution, cost. 2-layer is cheaper but harder for complex or high-speed designs.",
    ""
  ),
  makeQ(
    "What is EMI and how do you minimize it in PCB design?",
    "PCB & Hardware Design",
    "Hard",
    "EMI (Electromagnetic Interference) is unwanted electromagnetic emission that can disturb other circuits. Minimize by: continuous ground planes, short traces for high-speed signals, controlled impedance, proper decoupling, avoiding large current loops, using differential signaling, shielding, ferrite beads on power lines, and keeping digital and analog sections separated.",
    ""
  ),
  makeQ(
    "What is the skin effect and how does it affect PCB design?",
    "PCB & Hardware Design",
    "Hard",
    "At high frequencies, AC current concentrates on the surface of conductors, reducing the effective cross-section and increasing resistance. This increases signal attenuation at high frequencies. Mitigation: wider traces for high-frequency signals, use of copper with smooth surfaces, and accounting for skin-effect losses in impedance calculations.",
    ""
  ),
  makeQ(
    "How do you design a power supply for an embedded system?",
    "PCB & Hardware Design",
    "Hard",
    "Steps: 1) Determine all voltage rails needed and current requirements. 2) Choose regulator type: LDO for low noise/low dropout, switching regulator for efficiency/high current. 3) Add input/output capacitors per datasheet. 4) Consider thermal dissipation. 5) Route power traces wide enough for current. 6) Add protection (reverse polarity, overcurrent, ESD). 7) Separate analog and digital supplies.",
    ""
  ),
  makeQ(
    "What is ESD protection and why is it important?",
    "PCB & Hardware Design",
    "Medium",
    "ESD (Electrostatic Discharge) can damage or destroy sensitive electronic components. Protection methods: TVS (Transient Voltage Suppressor) diodes on external-facing pins, series resistors to limit current, proper grounding, ESD-safe component handling. All user-accessible interfaces (USB, connectors, buttons) should have ESD protection.",
    ""
  ),
  makeQ(
    "What is a differential pair and when do you use it?",
    "PCB & Hardware Design",
    "Medium",
    "A differential pair consists of two traces carrying equal and opposite signals. The receiver looks at the voltage difference, rejecting common-mode noise. Used in: USB, Ethernet, HDMI, LVDS, CAN, RS-485. Routing rules: keep traces equal length, maintain consistent spacing, route together, avoid splitting across ground plane gaps.",
    ""
  ),

  // ═══════════════════════════════════════════════════════════════
  // AUTOMATION & PLC
  // ═══════════════════════════════════════════════════════════════
  makeQ(
    "What is a PLC and how does it work?",
    "Automation & PLC",
    "Easy",
    "A PLC (Programmable Logic Controller) is an industrial computer for automation. It works in a scan cycle: 1) Read inputs from sensors/switches. 2) Execute the control program logic. 3) Update outputs to actuators/motors. 4) Housekeeping. This cycle repeats continuously, typically in milliseconds. PLCs are hardened for industrial environments (vibration, temperature, noise).",
    ""
  ),
  makeQ(
    "What is the difference between PLC, DCS, and SCADA?",
    "Automation & PLC",
    "Medium",
    "PLC: controls individual machines or processes, handles discrete/sequential logic, fast scan times. DCS (Distributed Control System): controls entire plants with distributed controllers, better for continuous processes. SCADA: supervisory system that monitors and controls remote equipment over a network, provides HMI and data acquisition. They often work together in industrial settings.",
    ""
  ),
  makeQ(
    "What are the PLC programming languages defined by IEC 61131-3?",
    "Automation & PLC",
    "Medium",
    "Five languages: Ladder Diagram (LD) — relay-like graphical logic, most popular. Function Block Diagram (FBD) — block-based graphical. Structured Text (ST) — high-level text, similar to Pascal. Instruction List (IL) — assembly-like text, deprecated. Sequential Function Chart (SFC) — models sequential processes with steps and transitions.",
    ""
  ),
  makeQ(
    "What is a sinking vs sourcing I/O configuration?",
    "Automation & PLC",
    "Medium",
    "Sourcing: the output/input provides (sources) current to the load/sensor — current flows from the I/O module to ground through the device. Sinking: the output/input receives (sinks) current from the load/sensor — current flows from power through the device into the I/O module. Must match sensor/actuator type. NPN sensors pair with sinking inputs; PNP with sourcing.",
    ""
  ),
  makeQ(
    "What is a SCADA system and what are its main components?",
    "Automation & PLC",
    "Easy",
    "SCADA (Supervisory Control and Data Acquisition) monitors and controls industrial processes remotely. Components: field devices (sensors/actuators), RTUs or PLCs (local control and data collection), communication network (Modbus, Ethernet, wireless), SCADA server/master (central processing), HMI (Human Machine Interface for operators). Used in power grids, water treatment, oil/gas, manufacturing.",
    ""
  ),
  makeQ(
    "What is an HMI in industrial automation?",
    "Automation & PLC",
    "Easy",
    "HMI (Human Machine Interface) is the operator interface to a control system. It provides: graphical display of process status, alarm management, trend/history data, manual control capabilities, and recipe management. Modern HMIs are touchscreen panels or PC-based applications connected to PLCs via protocols like Modbus TCP or OPC UA.",
    ""
  ),
  makeQ(
    "What is OPC UA and why is it important for automation?",
    "Automation & PLC",
    "Hard",
    "OPC UA (Open Platform Communications Unified Architecture) is a platform-independent, secure communication protocol for industrial automation. It provides standardized data modeling and communication between devices from different vendors. Features: built-in security, information modeling, discovery, pub-sub support. Key enabler for Industry 4.0 and IIoT interoperability.",
    ""
  ),
  makeQ(
    "What is a PID controller? Explain P, I, and D terms.",
    "Automation & PLC",
    "Medium",
    "PID is a feedback control algorithm: Output = Kp*e + Ki*∫e dt + Kd*de/dt. P (Proportional): responds to current error — larger error, larger correction. I (Integral): accumulates past error — eliminates steady-state offset. D (Derivative): responds to rate of change — dampens oscillation. Tuning these gains is critical for stable, responsive control.",
    "Practice tuning scenarios — underdamped, overdamped, steady-state error."
  ),
  makeQ(
    "What are safety PLCs and what is SIL?",
    "Automation & PLC",
    "Hard",
    "Safety PLCs are designed for safety-critical applications (emergency shutdowns, machine guarding). They have redundant processors, diagnostic self-tests, and certified architectures. SIL (Safety Integrity Level) ranges from SIL 1 (lowest) to SIL 4 (highest), defined by IEC 61508. Each level specifies allowable failure rates. Safety PLCs must meet the required SIL for their application.",
    ""
  ),
  makeQ(
    "What is a relay and how is it used in automation?",
    "Automation & PLC",
    "Easy",
    "A relay is an electrically operated switch: a coil creates a magnetic field that moves a contact to open or close a circuit. Used in automation for: switching high-power loads from low-power control signals, electrical isolation between control and power circuits, and legacy logic. Modern alternatives: solid-state relays (SSR) — faster, no mechanical wear, but more expensive.",
    ""
  ),
  makeQ(
    "What is ladder logic and why is it used?",
    "Automation & PLC",
    "Easy",
    "Ladder logic is a graphical PLC programming language that resembles relay circuit diagrams. Two vertical rails represent power; horizontal rungs contain contacts (inputs) and coils (outputs). Read left to right, top to bottom. Popular because: electricians and technicians already understand relay logic, easy to visualize, and good for sequential/combinational control logic.",
    ""
  ),
  makeQ(
    "Explain the concept of a scan cycle in a PLC.",
    "Automation & PLC",
    "Easy",
    "The PLC scan cycle has three main phases: 1) Input Scan — reads all physical inputs and stores values in the input image table. 2) Program Scan — executes the user program using the input image, updating the output image. 3) Output Scan — writes the output image to physical outputs. Plus housekeeping (diagnostics, communication). Scan time is typically 1-100ms depending on program size.",
    ""
  ),

  // ═══════════════════════════════════════════════════════════════
  // SIGNAL PROCESSING
  // ═══════════════════════════════════════════════════════════════
  makeQ(
    "State the Nyquist-Shannon sampling theorem.",
    "Signal Processing",
    "Easy",
    "To perfectly reconstruct a continuous signal from its samples, the sampling rate must be at least twice the highest frequency component in the signal (fs ≥ 2*fmax). The frequency fs/2 is called the Nyquist frequency. Sampling below this rate causes aliasing — higher frequencies fold into lower ones and are indistinguishable.",
    ""
  ),
  makeQ(
    "What is aliasing and how do you prevent it?",
    "Signal Processing",
    "Medium",
    "Aliasing occurs when a signal is sampled at less than twice its highest frequency, causing high-frequency components to appear as false lower frequencies. Prevention: use an anti-aliasing filter (analog low-pass filter) before the ADC to remove frequencies above fs/2. Also: oversample and digitally filter, then decimate.",
    ""
  ),
  makeQ(
    "What is the difference between FIR and IIR filters?",
    "Signal Processing",
    "Medium",
    "FIR (Finite Impulse Response): output depends only on current and past inputs. Always stable, can have linear phase, but requires more coefficients (higher order) for sharp cutoffs. IIR (Infinite Impulse Response): output depends on inputs AND past outputs (feedback). More efficient (fewer coefficients), but can be unstable, has nonlinear phase. FIR for phase-critical apps; IIR for efficiency.",
    ""
  ),
  makeQ(
    "What is quantization noise in ADC conversion?",
    "Signal Processing",
    "Medium",
    "Quantization noise is the error introduced by mapping continuous analog values to discrete digital levels. The maximum quantization error is ±0.5 LSB. Signal-to-Quantization Noise Ratio improves by ~6dB per bit of resolution. For a 12-bit ADC, SQNR ≈ 72dB. Dithering (adding small noise) can reduce quantization distortion at the cost of a white noise floor.",
    ""
  ),
  makeQ(
    "What is fixed-point vs floating-point arithmetic in DSP?",
    "Signal Processing",
    "Medium",
    "Fixed-point: represents numbers with a fixed number of integer and fractional bits. Faster, less power, cheaper hardware (no FPU needed), but limited range and requires careful scaling. Floating-point: represents numbers with mantissa and exponent. Larger range, easier to program, but slower and more expensive. Many MCUs lack an FPU, making fixed-point essential.",
    ""
  ),
  makeQ(
    "What is the DFT/FFT and what is it used for?",
    "Signal Processing",
    "Medium",
    "The DFT (Discrete Fourier Transform) converts a time-domain signal to frequency domain, revealing frequency components. FFT (Fast Fourier Transform) is an efficient algorithm to compute the DFT in O(N log N) instead of O(N²). Used for: spectrum analysis, vibration monitoring, audio processing, filter design, and communication systems.",
    ""
  ),
  makeQ(
    "What is oversampling and how does it improve ADC performance?",
    "Signal Processing",
    "Hard",
    "Oversampling means sampling at a rate much higher than Nyquist. Benefits: spreads quantization noise over a wider bandwidth, allowing digital filtering to reduce noise in the band of interest. Oversampling by 4x and averaging gives ~1 extra bit of effective resolution. Sigma-Delta ADCs heavily rely on oversampling and noise shaping for high resolution.",
    ""
  ),
  makeQ(
    "What is a moving average filter?",
    "Signal Processing",
    "Easy",
    "A moving average filter outputs the average of the last N samples. It's the simplest FIR low-pass filter. y[n] = (1/N) * Σ x[n-k] for k=0 to N-1. Good for smoothing noisy sensor data. Trade-off: larger N = more smoothing but more latency and memory. Efficient to implement with a circular buffer and running sum.",
    ""
  ),
  makeQ(
    "What is signal-to-noise ratio (SNR)?",
    "Signal Processing",
    "Easy",
    "SNR is the ratio of desired signal power to noise power, usually expressed in decibels: SNR(dB) = 10*log10(Psignal/Pnoise). Higher SNR means cleaner signal. For an ideal N-bit ADC, SNR ≈ 6.02N + 1.76 dB. Actual SNR is lower due to noise, nonlinearity, and jitter. Critical metric for evaluating sensor and ADC performance.",
    ""
  ),

  // ═══════════════════════════════════════════════════════════════
  // POWER ELECTRONICS
  // ═══════════════════════════════════════════════════════════════
  makeQ(
    "What is the difference between a linear regulator (LDO) and a switching regulator?",
    "Power Electronics",
    "Medium",
    "LDO: dissipates excess voltage as heat (Vin - Vout)*I. Simple, low noise, low cost, but inefficient for large Vin-Vout differences. Switching regulator: uses an inductor and switch to convert voltage efficiently (80-95%). More complex, introduces switching noise, but much better for battery life. Choose LDO for noise-sensitive analog circuits; switching for power efficiency.",
    ""
  ),
  makeQ(
    "What is a buck converter?",
    "Power Electronics",
    "Medium",
    "A buck (step-down) converter reduces DC voltage using a switch (MOSFET), inductor, diode, and capacitor. The switch alternately charges and discharges the inductor, and the output voltage is controlled by duty cycle: Vout = D * Vin (where D is duty cycle 0-1). Efficient for converting higher battery/supply voltage to lower MCU voltages.",
    ""
  ),
  makeQ(
    "What is a boost converter?",
    "Power Electronics",
    "Medium",
    "A boost (step-up) converter increases DC voltage. When the switch is on, current builds in the inductor. When off, the inductor's collapsing field adds to the input voltage, pushing higher voltage through the diode to the output capacitor. Vout = Vin / (1 - D). Used for: LED drivers, battery-powered devices needing higher voltage rails.",
    ""
  ),
  makeQ(
    "Explain the concept of efficiency in power supplies.",
    "Power Electronics",
    "Easy",
    "Efficiency = (Pout / Pin) * 100%. Power lost = Pin - Pout, dissipated as heat. LDOs: efficiency = Vout/Vin (can be very low, e.g., 3.3V from 12V = 27.5%). Switching regulators: typically 80-95% efficient. Higher efficiency means longer battery life, less heat, smaller heatsinks. Consider both loaded and light-load efficiency.",
    ""
  ),
  makeQ(
    "What is a MOSFET and how is it used as a switch?",
    "Power Electronics",
    "Easy",
    "A MOSFET (Metal-Oxide-Semiconductor Field-Effect Transistor) is a voltage-controlled switch. Applying voltage to the gate (above threshold Vgs(th)) creates a conducting channel between drain and source. N-channel: switch on with positive Vgs, placed on the low side. P-channel: switch on with negative Vgs, placed on the high side. Used in: power switching, motor drivers, voltage regulators.",
    ""
  ),
  makeQ(
    "What is PWM-based motor control?",
    "Power Electronics",
    "Medium",
    "Motor speed is controlled by varying the average voltage using PWM. Higher duty cycle = higher average voltage = faster speed. An H-bridge circuit (4 switches) allows bidirectional control. PWM frequency should be high enough to avoid audible noise (typically >20kHz). Current sensing provides feedback for precise torque/speed control.",
    ""
  ),

  // ═══════════════════════════════════════════════════════════════
  // SYSTEM DESIGN
  // ═══════════════════════════════════════════════════════════════
  makeQ(
    "How would you design an IoT sensor node?",
    "System Design",
    "Hard",
    "Key considerations: MCU selection (processing, peripherals, power modes), sensor interface (ADC, I2C/SPI), wireless communication (BLE, LoRa, WiFi — trade-off range vs power vs data rate), power source (battery type, energy harvesting, power budget), enclosure (IP rating, antenna placement), firmware architecture (RTOS vs bare-metal, OTA updates), security (encrypted communication, secure boot), cloud connectivity protocol (MQTT, CoAP).",
    ""
  ),
  makeQ(
    "Design a real-time data acquisition system.",
    "System Design",
    "Hard",
    "Architecture: sensors → signal conditioning (filtering, amplification) → ADC (sampling rate based on Nyquist) → DMA to memory buffer → processing (filtering, averaging, FFT) → storage/display/transmission. Consider: timing requirements (hard or soft real-time), buffering strategy (double buffer/ring buffer to avoid data loss), and error handling (sensor faults, communication timeouts, watchdog).",
    ""
  ),
  makeQ(
    "How would you design a motor control system?",
    "System Design",
    "Hard",
    "Components: MCU with PWM outputs, H-bridge or 3-phase inverter, current sensing (shunt resistors + ADC), encoder/Hall sensors for position feedback, gate drivers. Control loop: position/speed setpoint → PID controller → PWM output → motor → feedback. Consider: control loop frequency (>1kHz), protection (overcurrent, overtemperature, shoot-through prevention), and communication interface for commands.",
    ""
  ),
  makeQ(
    "How do you approach debugging a hardware/software integration issue?",
    "System Design",
    "Medium",
    "Systematic approach: 1) Isolate — is it hardware or software? Use oscilloscope/logic analyzer to verify signals. 2) Check basics — power rails stable? Clock running? Reset clean? 3) Simplify — minimal test code to test one peripheral. 4) Check configuration — register settings, pin muxing, clock enables. 5) Review schematic — correct connections, pull-ups, decoupling. 6) Use JTAG debugger to step through initialization code.",
    ""
  ),
  makeQ(
    "What is OTA (Over-The-Air) firmware update and how would you implement it?",
    "System Design",
    "Hard",
    "OTA allows updating firmware remotely without physical access. Implementation: dual-bank flash (A/B partitions) — run from one, write update to the other, swap on reboot. Bootloader verifies new image (CRC/signature) before switching. Rollback mechanism if new firmware fails. Secure: encrypt the firmware image, authenticate with digital signatures, use HTTPS/TLS for transfer.",
    ""
  ),
  makeQ(
    "What factors do you consider when choosing a microcontroller for a project?",
    "System Design",
    "Medium",
    "CPU performance (MHz, architecture), memory (Flash and RAM size), peripherals needed (ADC, timers, communication), power consumption (sleep modes, µA/MHz), package/pin count, operating temperature range, available development tools and ecosystem, supply chain/availability, cost, and whether an RTOS or bare-metal approach fits. Also consider future scalability within the MCU family.",
    ""
  ),
  makeQ(
    "What is JTAG/SWD and how is it used in embedded development?",
    "System Design",
    "Medium",
    "JTAG (Joint Test Action Group) and SWD (Serial Wire Debug) are debug interfaces. They allow: flashing firmware, setting breakpoints, stepping through code, reading registers and memory, and boundary scan testing. SWD uses only 2 pins (SWDIO, SWCLK) vs JTAG's 4-5 pins. SWD is common on ARM Cortex-M. Essential for development and production programming.",
    ""
  ),
  makeQ(
    "What is functional safety in embedded systems?",
    "System Design",
    "Hard",
    "Functional safety ensures that safety-related systems operate correctly or fail safely. Standards: IEC 61508 (general), ISO 26262 (automotive), DO-178C (aerospace), IEC 62304 (medical). Techniques include: redundancy, self-diagnostics, watchdog timers, memory protection (ECC, MPU), defensive programming, coding standards (MISRA C), and formal verification. Certification requires documented evidence of safety measures.",
    ""
  ),

  // ═══════════════════════════════════════════════════════════════
  // BEHAVIORAL
  // ═══════════════════════════════════════════════════════════════
  makeQ(
    "Tell me about a challenging embedded bug you debugged.",
    "Behavioral",
    "Medium",
    "Use the STAR format: Situation (describe the system and symptom — e.g., intermittent crash in a sensor node). Task (your role in diagnosing it). Action (tools used — logic analyzer, JTAG, printf debugging; the investigation steps — checking power, signals, timing, code review). Result (root cause — e.g., stack overflow in ISR, race condition — and the fix, plus lessons learned).",
    "Have 2-3 stories ready. Quantify results when possible."
  ),
  makeQ(
    "Describe a project where you had to make hardware/software trade-offs.",
    "Behavioral",
    "Medium",
    "STAR format. Examples: implementing a function in software vs dedicated hardware (cost vs performance), choosing between a more powerful MCU vs optimizing code for a cheaper one, trading memory for speed, or adding a hardware watchdog vs software timeout. Show you understand the constraints (cost, time-to-market, power, reliability) and can justify decisions.",
    ""
  ),
  makeQ(
    "How do you handle a situation where a project deadline is at risk?",
    "Behavioral",
    "Easy",
    "STAR format. Key points: early communication with stakeholders, prioritize critical features (MVP approach), identify and address blockers, ask for help or resources if needed, propose alternatives (reduce scope, parallel work, extended timeline). Show that you're proactive, communicative, and solution-oriented rather than just working harder.",
    ""
  ),
  makeQ(
    "Tell me about a time you had to learn a new technology quickly for a project.",
    "Behavioral",
    "Easy",
    "STAR format. Describe the technology (new MCU family, protocol, tool, language), how you approached learning (datasheets, tutorials, prototyping, asking experts), what you built, and the result. Emphasize: structured learning approach, hands-on experimentation, seeking help when stuck, and applying knowledge to deliver results.",
    ""
  ),
  makeQ(
    "How do you ensure code quality in embedded systems?",
    "Behavioral",
    "Medium",
    "Techniques: follow coding standards (MISRA C), code reviews, unit testing (CUnit, Unity), static analysis tools (PC-lint, Coverity, cppcheck), continuous integration, defensive programming (assert, bounds checking), documentation, version control, and peer design reviews. For safety-critical: formal verification, coverage analysis, and traceability to requirements.",
    ""
  ),
  makeQ(
    "Describe your experience working with cross-functional teams (hardware, software, test).",
    "Behavioral",
    "Easy",
    "STAR format. Highlight: communication across disciplines (explaining software constraints to hardware engineers and vice versa), collaborative debugging (e.g., signal integrity issue requiring both HW and SW investigation), defining and negotiating interfaces (pin assignments, timing requirements), and shared documentation practices. Show respect for other disciplines' expertise.",
    ""
  ),
  makeQ(
    "Tell me about a time you improved a process or tool in your team.",
    "Behavioral",
    "Medium",
    "STAR format. Examples: setting up CI/CD for firmware builds, creating automated test fixtures, improving code review processes, writing a debugging utility, creating documentation templates, or setting up hardware-in-the-loop testing. Quantify the improvement (time saved, bugs caught, onboarding speed).",
    ""
  ),
  makeQ(
    "How do you prioritize and manage multiple tasks in a project?",
    "Behavioral",
    "Easy",
    "Discuss your approach: understand priorities and dependencies, break down tasks, estimate effort, communicate status regularly, use tools (Jira, Kanban boards), focus on critical path items first, and be willing to re-prioritize when requirements change. Show that you balance urgency with importance and keep stakeholders informed.",
    ""
  ),
  makeQ(
    "Describe a time you disagreed with a team member on a technical decision.",
    "Behavioral",
    "Medium",
    "STAR format. Show: you listened to their perspective, presented your reasoning with data/evidence, found common ground or a compromise, and maintained professional respect. The best answer shows you prioritize the project outcome over being right, and that you can disagree constructively while maintaining relationships.",
    ""
  ),
  makeQ(
    "What are your strengths and weaknesses as an embedded engineer?",
    "Behavioral",
    "Easy",
    "Be genuine. Strengths: pick 2-3 relevant ones (debugging skills, hardware understanding, attention to detail, communication). Weakness: pick a real one you're actively improving (e.g., 'I sometimes spend too long optimizing before it's necessary — I'm learning to ship first and optimize later'). Show self-awareness and growth mindset.",
    ""
  ),
];
