export interface LessonSection {
  title: string;
  content: string;
  code?: string;
  codeLanguage?: string;
  diagram?: string; // SVG string
  tips?: string[];
}

export interface Lesson {
  slug: string;
  category: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedMinutes: number;
  sections: LessonSection[];
  keyTakeaways: string[];
}

export const LESSONS: Lesson[] = [
  {
    slug: "embedded-c-cpp",
    category: "Embedded C/C++",
    title: "Mastering Embedded C/C++",
    description: "Pointers, memory management, volatile, bit manipulation, and low-level programming patterns critical for embedded interviews.",
    icon: "⚙️",
    color: "violet",
    gradientFrom: "from-violet-500",
    gradientTo: "to-purple-600",
    difficulty: "Intermediate",
    estimatedMinutes: 45,
    sections: [
      {
        title: "Pointers & Memory Management",
        content: "In embedded systems, you work directly with hardware registers mapped to specific memory addresses. Understanding pointer arithmetic, void pointers, and function pointers is essential. Unlike desktop applications, embedded systems often lack a heap, so stack and static allocation dominate.",
        code: `// Accessing a hardware register via pointer
#define GPIO_PORT_A  ((volatile uint32_t *)0x40020000)
#define GPIO_PIN_5   (1U << 5)

void toggle_led(void) {
    *GPIO_PORT_A ^= GPIO_PIN_5;  // XOR to toggle
}

// Function pointer for callback pattern
typedef void (*irq_handler_t)(void);
irq_handler_t vector_table[64];

void register_handler(uint8_t irq, irq_handler_t handler) {
    vector_table[irq] = handler;
}`,
        codeLanguage: "c",
        tips: [
          "Always use volatile for hardware registers to prevent compiler optimizations",
          "Avoid dynamic memory allocation (malloc/free) in safety-critical systems",
          "Use static and const liberally to reduce RAM usage and catch bugs at compile time"
        ]
      },
      {
        title: "Bit Manipulation Techniques",
        content: "Embedded programmers constantly work at the bit level to configure peripherals, read status flags, and pack data efficiently. Master these common patterns — they appear in almost every embedded interview.",
        code: `// Common bit manipulation patterns
#define SET_BIT(reg, bit)    ((reg) |=  (1U << (bit)))
#define CLEAR_BIT(reg, bit)  ((reg) &= ~(1U << (bit)))
#define TOGGLE_BIT(reg, bit) ((reg) ^=  (1U << (bit)))
#define CHECK_BIT(reg, bit)  ((reg) &   (1U << (bit)))

// Extract a field from a register
#define GET_FIELD(reg, mask, shift) \\
    (((reg) & (mask)) >> (shift))

// Example: Configure UART baud rate register
// Bits [15:0] = divider, Bits [19:16] = fractional
uint32_t uart_brr = 0;
uart_brr |= (104 << 0);   // divider = 104
uart_brr |= (3 << 16);    // fractional = 3`,
        codeLanguage: "c",
        tips: [
          "Use unsigned types for bit operations to avoid sign-extension issues",
          "Prefer macro definitions for register bit fields — they make code self-documenting",
          "Know how to count set bits, reverse bits, and find first set bit — popular interview problems"
        ]
      },
      {
        title: "The volatile Keyword Deep Dive",
        content: "The volatile qualifier tells the compiler that a variable's value may change at any time without action by the surrounding code. It prevents optimization of reads/writes. This is critical for hardware registers, shared variables in ISR contexts, and memory-mapped I/O.",
        code: `// Without volatile — compiler may optimize away the loop!
uint32_t *status_reg = (uint32_t *)0x40021008;
while (*status_reg & 0x01) { }  // May be optimized to if()

// With volatile — compiler reads every iteration
volatile uint32_t *status_reg = (volatile uint32_t *)0x40021008;
while (*status_reg & 0x01) { }  // Guaranteed to re-read

// Shared variable between ISR and main
volatile bool data_ready = false;

void USART1_IRQHandler(void) {
    rx_buffer[idx++] = USART1->DR;
    data_ready = true;
}

int main(void) {
    while (1) {
        if (data_ready) {
            process_data();
            data_ready = false;
        }
    }
}`,
        codeLanguage: "c",
        tips: [
          "volatile does NOT provide atomicity — you still need critical sections for multi-byte variables",
          "A common interview question: 'Can a variable be both const and volatile?' — Yes! A read-only hardware register",
          "volatile prevents reordering of reads/writes by the compiler, but not by the CPU"
        ]
      },
      {
        title: "Memory Layout & Linker Scripts",
        content: "Embedded engineers must understand how code and data are organized in memory. The linker script defines sections like .text (code), .data (initialized globals), .bss (zero-initialized globals), and the stack. Interview questions often test whether you understand where different variables live.",
        code: `// Where do these live in memory?
const uint8_t lookup[] = {0,1,1,2,1,2,2,3};  // .rodata (Flash)
static int counter = 42;     // .data (RAM, initialized from Flash)
static int zeros[100];       // .bss (RAM, zero-initialized)
char *msg = "Hello";         // pointer in .data, string in .rodata

void foo(void) {
    int local = 10;           // Stack
    static int persist = 0;   // .data (survives function calls)
    char *heap = malloc(32);  // Heap (if available)
}

// Typical linker script memory layout
// MEMORY {
//   FLASH (rx)  : ORIGIN = 0x08000000, LENGTH = 512K
//   RAM   (rwx) : ORIGIN = 0x20000000, LENGTH = 128K
// }`,
        codeLanguage: "c"
      }
    ],
    keyTakeaways: [
      "Master pointer arithmetic and how it maps to hardware register access",
      "Know all the bit manipulation idioms by heart",
      "Understand volatile deeply — when and why to use it",
      "Be able to explain where every variable lives in the memory map"
    ]
  },
  {
    slug: "rtos-scheduling",
    category: "RTOS & Scheduling",
    title: "Real-Time Operating Systems",
    description: "Task scheduling, synchronization primitives, priority inversion, and real-time design patterns used in FreeRTOS, Zephyr, and more.",
    icon: "🔄",
    color: "sky",
    gradientFrom: "from-sky-500",
    gradientTo: "to-blue-600",
    difficulty: "Advanced",
    estimatedMinutes: 50,
    sections: [
      {
        title: "Task Scheduling Fundamentals",
        content: "An RTOS gives you deterministic, preemptive multitasking. Tasks (threads) run based on priority — a higher-priority task always preempts a lower-priority one. The scheduler maintains ready, running, blocked, and suspended states. Understanding the tick interrupt and time-slicing for equal-priority tasks is key.",
        code: `// FreeRTOS task creation
void vSensorTask(void *pvParameters) {
    TickType_t xLastWakeTime = xTaskGetTickCount();
    const TickType_t xPeriod = pdMS_TO_TICKS(100); // 100ms

    for (;;) {
        float temp = read_temperature();
        xQueueSend(xTempQueue, &temp, portMAX_DELAY);

        // Precise periodic execution
        vTaskDelayUntil(&xLastWakeTime, xPeriod);
    }
}

void vDisplayTask(void *pvParameters) {
    float temp;
    for (;;) {
        // Block until data is available
        if (xQueueReceive(xTempQueue, &temp, portMAX_DELAY)) {
            update_lcd(temp);
        }
    }
}

int main(void) {
    xTempQueue = xQueueCreate(10, sizeof(float));
    xTaskCreate(vSensorTask, "Sensor", 256, NULL, 2, NULL);
    xTaskCreate(vDisplayTask, "Display", 256, NULL, 1, NULL);
    vTaskStartScheduler();
}`,
        codeLanguage: "c",
        tips: [
          "vTaskDelay() is relative; vTaskDelayUntil() gives precise periodic timing",
          "Stack size must be carefully calculated — stack overflow is a silent killer in RTOS",
          "Use task notifications instead of semaphores when possible — they're faster and use less RAM"
        ]
      },
      {
        title: "Synchronization: Mutexes & Semaphores",
        content: "When tasks share resources, you need synchronization. Mutexes protect shared data (with ownership), semaphores signal between tasks (without ownership). Binary semaphores work well for ISR-to-task signaling. Counting semaphores manage pools of resources.",
        code: `// Mutex for shared resource
SemaphoreHandle_t xI2CMutex;

float read_sensor_i2c(uint8_t addr) {
    float val = 0;
    if (xSemaphoreTake(xI2CMutex, pdMS_TO_TICKS(100))) {
        i2c_start();
        i2c_write(addr);
        val = i2c_read_float();
        i2c_stop();
        xSemaphoreGive(xI2CMutex);
    }
    return val;
}

// Binary semaphore for ISR-to-task signaling
SemaphoreHandle_t xUARTSem;

void USART1_IRQHandler(void) {
    BaseType_t xHigherPrioWoken = pdFALSE;
    buffer[idx++] = USART1->DR;
    if (idx >= PACKET_SIZE) {
        xSemaphoreGiveFromISR(xUARTSem, &xHigherPrioWoken);
    }
    portYIELD_FROM_ISR(xHigherPrioWoken);
}`,
        codeLanguage: "c"
      },
      {
        title: "Priority Inversion & Solutions",
        content: "Priority inversion occurs when a high-priority task is blocked waiting for a mutex held by a low-priority task, while a medium-priority task runs. This was famously encountered in the Mars Pathfinder mission. Solutions include priority inheritance (mutex temporarily boosts holder's priority) and priority ceiling (mutex has a fixed ceiling priority).",
        code: `// Priority Inversion Scenario:
// Task H (High)   — needs mutex M
// Task M (Medium) — CPU-bound work
// Task L (Low)    — holds mutex M
//
// Timeline:
// 1. Task L acquires mutex M
// 2. Task H preempts, tries to acquire M → blocks
// 3. Task M preempts Task L → runs indefinitely
// 4. Task H is effectively blocked by Task M!
//
// Solution: Priority Inheritance Mutex
xMutex = xSemaphoreCreateMutex(); // Has priority inheritance

// When Task H blocks on xMutex:
// → FreeRTOS boosts Task L to Task H's priority
// → Task L can't be preempted by Task M
// → Task L finishes, gives mutex, drops back to low priority
// → Task H runs immediately`,
        codeLanguage: "c",
        tips: [
          "FreeRTOS mutexes include priority inheritance by default",
          "Priority ceiling protocol is more predictable but harder to implement",
          "The Mars Pathfinder bug is a classic interview discussion topic — know it well"
        ]
      }
    ],
    keyTakeaways: [
      "Understand preemptive vs cooperative scheduling and the task state machine",
      "Know the difference between mutex (ownership) and semaphore (signaling)",
      "Be ready to explain priority inversion and how to solve it",
      "Practice designing multi-task systems with queues and synchronization"
    ]
  },
  {
    slug: "digital-logic-circuits",
    category: "Digital Logic & Circuits",
    title: "Digital Logic Fundamentals",
    description: "Boolean algebra, combinational and sequential circuits, state machines, timing analysis, and common digital building blocks.",
    icon: "🔌",
    color: "emerald",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-600",
    difficulty: "Intermediate",
    estimatedMinutes: 40,
    sections: [
      {
        title: "Combinational Logic & Boolean Algebra",
        content: "Combinational circuits produce outputs based solely on current inputs — no memory. Key operations: AND, OR, NOT, XOR, NAND, NOR. Use De Morgan's laws, Karnaugh maps, and Boolean algebra to simplify expressions. Multiplexers, decoders, and encoders are the most common building blocks.",
        code: `// De Morgan's Laws (fundamental to gate-level optimization):
// NOT(A AND B) = (NOT A) OR (NOT B)
// NOT(A OR B)  = (NOT A) AND (NOT B)
//
// Example: Simplify F = A'B'C + A'BC + AB'C + ABC
// F = C(A'B' + A'B + AB' + AB)
// F = C(A'(B'+B) + A(B'+B))
// F = C(A' + A)
// F = C
//
// 2-to-1 MUX implementation:
// Output = (SEL' · A) + (SEL · B)
//
// 4-to-1 MUX using two select lines:
// Output = S1'·S0'·D0 + S1'·S0·D1 + S1·S0'·D2 + S1·S0·D3`,
        codeLanguage: "text",
        tips: [
          "NAND and NOR are universal gates — any circuit can be built from just one type",
          "Karnaugh maps are useful for up to 4-5 variables; beyond that use Quine-McCluskey",
          "Interview tip: always check for don't-care conditions — they can simplify your logic significantly"
        ]
      },
      {
        title: "Sequential Logic & State Machines",
        content: "Sequential circuits have memory — their output depends on both inputs and current state. Flip-flops (D, JK, T) are the fundamental storage elements. Finite State Machines (FSMs) are used everywhere: protocol decoders, controllers, and sequence detectors. Learn both Mealy (output depends on state + input) and Moore (output depends on state only) models.",
        code: `// Verilog: Simple traffic light FSM (Moore machine)
module traffic_light (
    input  clk, reset,
    output reg [1:0] light  // 00=Red, 01=Yellow, 10=Green
);
    // State encoding
    localparam RED    = 2'b00;
    localparam GREEN  = 2'b01;
    localparam YELLOW = 2'b10;

    reg [1:0] state, next_state;
    reg [3:0] counter;

    always @(posedge clk or posedge reset) begin
        if (reset) begin
            state <= RED;
            counter <= 0;
        end else begin
            if (counter == 0) state <= next_state;
            else counter <= counter - 1;
        end
    end

    always @(*) begin
        case (state)
            RED:    begin next_state = GREEN;  light = 2'b00; end
            GREEN:  begin next_state = YELLOW; light = 2'b10; end
            YELLOW: begin next_state = RED;    light = 2'b01; end
            default: begin next_state = RED;   light = 2'b00; end
        endcase
    end
endmodule`,
        codeLanguage: "verilog"
      },
      {
        title: "Timing Analysis Essentials",
        content: "Setup time is how long data must be stable BEFORE the clock edge. Hold time is how long data must be stable AFTER the clock edge. Propagation delay is the time for a signal to travel through a gate. The maximum clock frequency is determined by the critical path: the longest combinational delay between two flip-flops plus setup time.",
        code: `// Critical path timing calculation:
//
//  FF1 --[tpd_combo]--> FF2
//
// Tclk_min = tpd_FF + tpd_combo + tsetup_FF
//
// Example:
// tpd_FF = 2ns (flip-flop clock-to-Q delay)
// tpd_combo = 8ns (combinational logic delay)
// tsetup_FF = 1ns (setup time)
//
// Tclk_min = 2 + 8 + 1 = 11ns
// Fmax = 1/11ns ≈ 90.9 MHz
//
// Hold time check:
// tpd_FF + tpd_combo_min > thold_FF
// If violated → data corruption (metastability)`,
        codeLanguage: "text",
        tips: [
          "Setup violations → reduce clock speed or pipeline the critical path",
          "Hold violations → add buffer delays (harder to fix, usually caught in synthesis)",
          "Metastability occurs when sampling asynchronous signals — use double-flip-flop synchronizers"
        ]
      }
    ],
    keyTakeaways: [
      "Master Boolean simplification — it shows up in optimization questions",
      "Know how to design and implement FSMs in both hardware and software",
      "Understand timing constraints (setup, hold, propagation delay)",
      "Be able to calculate maximum clock frequency from a circuit diagram"
    ]
  },
  {
    slug: "communication-protocols",
    category: "Communication Protocols",
    title: "Embedded Communication Protocols",
    description: "SPI, I2C, UART, CAN, and other protocols — how they work electrically and in software, and when to choose each one.",
    icon: "📡",
    color: "amber",
    gradientFrom: "from-amber-500",
    gradientTo: "to-orange-600",
    difficulty: "Intermediate",
    estimatedMinutes: 40,
    sections: [
      {
        title: "UART (Universal Asynchronous)",
        content: "UART is the simplest serial protocol: point-to-point, full-duplex, no clock line. Both devices must agree on baud rate. A frame consists of: start bit (low), 5-9 data bits, optional parity bit, and 1-2 stop bits (high). Common baud rates: 9600, 115200, 921600.",
        code: `// UART frame for sending 0x55 at 8N1:
// IDLE ─── START ─ D0 D1 D2 D3 D4 D5 D6 D7 ─ STOP ─── IDLE
// HIGH ─── LOW  ─  1  0  1  0  1  0  1  0  ─ HIGH ─── HIGH
//                  (LSB first = 0x55)
//
// Bit time = 1/baud_rate
// At 115200: bit time = 8.68 μs
// Frame time (10 bits) = 86.8 μs

// STM32 UART initialization
void uart_init(uint32_t baud) {
    RCC->APB2ENR |= RCC_APB2ENR_USART1EN;
    USART1->BRR = SystemCoreClock / baud;
    USART1->CR1 = USART_CR1_TE | USART_CR1_RE | USART_CR1_UE;
}

void uart_send(uint8_t data) {
    while (!(USART1->SR & USART_SR_TXE));
    USART1->DR = data;
}`,
        codeLanguage: "c"
      },
      {
        title: "SPI (Serial Peripheral Interface)",
        content: "SPI is a synchronous, full-duplex, master-slave protocol with 4 wires: MOSI, MISO, SCLK, and CS (chip select). It's the fastest common embedded protocol, reaching 50+ MHz. Data is clocked on rising or falling edges depending on CPOL/CPHA settings (4 modes). No addressing — devices are selected by individual CS lines.",
        code: `// SPI signals:
// SCLK ─── Clock (master generates)
// MOSI ─── Master Out, Slave In (data to slave)
// MISO ─── Master In, Slave Out (data from slave)
// CS   ─── Chip Select (active low, one per slave)
//
// SPI Mode | CPOL | CPHA | Clock Idle | Sample Edge
//    0     |  0   |  0   |   Low      | Rising
//    1     |  0   |  1   |   Low      | Falling
//    2     |  1   |  0   |   High     | Falling
//    3     |  1   |  1   |   High     | Rising

uint8_t spi_transfer(uint8_t tx) {
    CS_LOW();
    SPI1->DR = tx;
    while (!(SPI1->SR & SPI_SR_RXNE));
    uint8_t rx = SPI1->DR;
    CS_HIGH();
    return rx;
}

// Reading a register from an SPI sensor
uint8_t read_reg(uint8_t addr) {
    spi_transfer(addr | 0x80); // Read bit
    return spi_transfer(0xFF); // Dummy byte to clock data in
}`,
        codeLanguage: "c"
      },
      {
        title: "I2C (Inter-Integrated Circuit)",
        content: "I2C uses just 2 wires (SDA + SCL) with open-drain drivers and pull-up resistors. It supports multiple masters and slaves on the same bus using 7-bit (or 10-bit) addressing. Standard mode runs at 100 kHz, fast mode at 400 kHz, and fast-mode plus at 1 MHz. The protocol includes start/stop conditions, ACK/NACK, and clock stretching.",
        code: `// I2C transaction to read a sensor register:
// START → [Slave Addr + W] → ACK → [Reg Addr] → ACK →
// RESTART → [Slave Addr + R] → ACK → [Data] → NACK → STOP
//
// ACK = SDA pulled low by receiver
// NACK = SDA stays high (master signals end of read)

uint8_t i2c_read_reg(uint8_t dev_addr, uint8_t reg) {
    uint8_t data;

    i2c_start();
    i2c_write_byte((dev_addr << 1) | 0);  // Write mode
    i2c_write_byte(reg);                    // Register addr

    i2c_start();                            // Repeated start
    i2c_write_byte((dev_addr << 1) | 1);   // Read mode
    data = i2c_read_byte(NACK);            // Read + NACK
    i2c_stop();

    return data;
}`,
        codeLanguage: "c",
        tips: [
          "I2C is slower than SPI but needs fewer wires — good for sensors, EEPROMs, RTCs",
          "SPI is best for high-speed peripherals: displays, flash, ADCs",
          "UART is simplest but requires matched baud rates and is point-to-point only",
          "CAN is the go-to for automotive — differential signaling, built-in error detection"
        ]
      }
    ],
    keyTakeaways: [
      "Know the trade-offs: SPI (fast, more wires) vs I2C (slower, fewer wires) vs UART (simplest, async)",
      "Be able to draw timing diagrams for each protocol",
      "Understand electrical details: pull-ups for I2C, chip select for SPI",
      "Know common use cases and when to choose each protocol"
    ]
  },
  {
    slug: "microcontrollers",
    category: "Microcontrollers",
    title: "Microcontroller Architecture & Peripherals",
    description: "ARM Cortex-M internals, interrupt handling, peripheral configuration, power management, and bootloader concepts.",
    icon: "🔲",
    color: "rose",
    gradientFrom: "from-rose-500",
    gradientTo: "to-red-600",
    difficulty: "Intermediate",
    estimatedMinutes: 45,
    sections: [
      {
        title: "ARM Cortex-M Architecture",
        content: "Most modern microcontrollers use ARM Cortex-M cores (M0, M3, M4, M7). They feature a 3-stage pipeline, Thumb-2 instruction set, nested vectored interrupt controller (NVIC), and hardware-assisted context switching. The M4 adds DSP instructions and optional FPU. Understanding the register set, exception model, and memory map is essential.",
        code: `// ARM Cortex-M core registers:
// R0-R3:   Argument/scratch registers
// R4-R11:  Callee-saved registers
// R12 (IP): Intra-Procedure scratch
// R13 (SP): Stack Pointer (MSP or PSP)
// R14 (LR): Link Register (return address)
// R15 (PC): Program Counter
// xPSR:    Program Status Register
//
// Memory map (Cortex-M standard):
// 0x00000000 - 0x1FFFFFFF: Code (Flash)
// 0x20000000 - 0x3FFFFFFF: SRAM
// 0x40000000 - 0x5FFFFFFF: Peripherals
// 0xE0000000 - 0xE00FFFFF: System (NVIC, SysTick, etc.)
//
// Vector table starts at 0x00000000:
// [0] Initial SP value
// [1] Reset handler address
// [2] NMI handler
// [3] HardFault handler
// [4+] Peripheral interrupts`,
        codeLanguage: "text"
      },
      {
        title: "Interrupt Handling & NVIC",
        content: "The Nested Vectored Interrupt Controller (NVIC) manages up to 240 external interrupts with configurable priorities. When an interrupt fires: the CPU automatically stacks R0-R3, R12, LR, PC, and xPSR (tail-chaining avoids restacking). ISRs should be short — defer heavy work to main loop or an RTOS task.",
        code: `// Configuring and handling an interrupt
void EXTI0_IRQHandler(void) {
    if (EXTI->PR & EXTI_PR_PR0) {
        EXTI->PR = EXTI_PR_PR0;  // Clear pending flag
        button_pressed = true;    // Set flag, don't do heavy work!
    }
}

void setup_button_interrupt(void) {
    // Enable GPIOA clock and configure PA0 as input
    RCC->AHB1ENR |= RCC_AHB1ENR_GPIOAEN;

    // Configure EXTI line 0 for falling edge
    EXTI->FTSR |= EXTI_FTSR_TR0;
    EXTI->IMR  |= EXTI_IMR_MR0;

    // Set priority and enable in NVIC
    NVIC_SetPriority(EXTI0_IRQn, 2);
    NVIC_EnableIRQ(EXTI0_IRQn);
}

// Critical section to prevent race conditions
void safe_read_shared_data(void) {
    __disable_irq();       // Disable all interrupts
    uint32_t copy = shared_data;
    __enable_irq();        // Re-enable
    process(copy);
}`,
        codeLanguage: "c",
        tips: [
          "Keep ISRs short: set a flag, add to a queue, or give a semaphore — nothing more",
          "Use volatile for variables shared between ISR and main context",
          "Tail-chaining: ARM automatically handles back-to-back interrupts efficiently",
          "Never call blocking functions (printf, malloc, delay) from an ISR"
        ]
      },
      {
        title: "Low Power Modes",
        content: "Battery-powered devices spend most of their life asleep. ARM Cortex-M provides Sleep, Deep Sleep, and Stop/Standby modes. Each disables different clocks and peripherals to reduce power from milliamps to microamps or even nanoamps. Wakeup sources include RTC alarms, external interrupts, and watchdog timers.",
        code: `// Power consumption hierarchy:
// Run mode:     10-100 mA (all clocks active)
// Sleep:        1-10 mA   (CPU stopped, peripherals running)
// Deep Sleep:   10-100 μA (most clocks stopped)
// Stop:         1-10 μA   (only LSE/RTC running)
// Standby:      < 1 μA    (only wakeup pin and RTC)

void enter_stop_mode(void) {
    // Configure RTC alarm for wakeup
    rtc_set_alarm(WAKEUP_INTERVAL);

    // Disable unused peripherals
    RCC->APB1ENR &= ~(RCC_APB1ENR_TIM2EN | RCC_APB1ENR_SPI2EN);

    // Configure Stop mode
    PWR->CR |= PWR_CR_LPDS;     // Low-power deepsleep
    SCB->SCR |= SCB_SCR_SLEEPDEEP_Msk;

    __WFI();  // Wait For Interrupt — CPU sleeps here

    // Execution resumes here after wakeup
    restore_clocks();
}`,
        codeLanguage: "c"
      }
    ],
    keyTakeaways: [
      "Understand the ARM Cortex-M memory map and vector table",
      "Know how the NVIC handles priorities and preemption",
      "ISRs must be fast — defer work to the main loop or RTOS tasks",
      "Low power design is critical for IoT — know the power modes and their trade-offs"
    ]
  },
  {
    slug: "pcb-hardware-design",
    category: "PCB & Hardware Design",
    title: "PCB Design & Hardware Fundamentals",
    description: "Schematic reading, PCB layout rules, power supply design, EMC considerations, and design for manufacturability.",
    icon: "🖨️",
    color: "teal",
    gradientFrom: "from-teal-500",
    gradientTo: "to-cyan-600",
    difficulty: "Intermediate",
    estimatedMinutes: 35,
    sections: [
      {
        title: "Schematic Reading & Component Selection",
        content: "Embedded engineers must be comfortable reading schematics. Key components include bypass/decoupling capacitors (100nF ceramic near every IC), pull-up/pull-down resistors, voltage regulators (LDO vs switching), ESD protection diodes, and crystal oscillators. Understanding component parasitics and tolerances is crucial.",
        code: `// Essential bypass capacitor placement:
// Every VDD pin gets a 100nF ceramic cap to GND
// Place as close to the pin as physically possible
// Add a bulk 10μF–100μF cap near power entry
//
// Pull-up resistor calculation for I2C:
// Rp = (VDD - VOL) / IOL
// For 3.3V I2C at 400kHz:
// Rp_min = 1kΩ (limited by IOL = 3mA)
// Rp_max depends on bus capacitance:
//   Rp_max = tr / (0.8473 × Cb)
//   For Cb = 200pF, tr = 300ns → Rp_max ≈ 1.77kΩ
// Common choice: 2.2kΩ or 4.7kΩ

// Decoupling capacitor selection guide:
// 100nF ceramic  → High-frequency noise filtering
// 1μF ceramic    → Mid-frequency + digital switching
// 10μF tantalum  → Low-frequency bulk decoupling
// 100μF electro  → Power supply bulk storage`,
        codeLanguage: "text",
        tips: [
          "Every IC needs decoupling caps — this is the #1 PCB design rule",
          "Know the difference between LDO (low noise, low efficiency) and switching regulators (high efficiency, noisy)",
          "Crystal load capacitors: CL = (C1 × C2)/(C1 + C2) + Cstray"
        ]
      },
      {
        title: "PCB Layout Best Practices",
        content: "Good PCB layout is critical for reliable embedded systems. Key rules: keep high-speed traces short, use ground planes for return current paths, separate analog and digital sections, follow manufacturer guidelines for trace width (based on current and temperature rise), and maintain proper clearances for your voltage levels.",
        code: `// Trace width calculation (IPC-2152):
// For 1oz copper (35μm), outer layer, 10°C rise:
// 1A  → ~10 mil (0.25mm)
// 2A  → ~25 mil (0.64mm)
// 5A  → ~80 mil (2.03mm)
//
// Impedance-controlled traces (50Ω microstrip):
// For FR4 (εr=4.2), 1oz copper, over ground plane:
// h = 10 mil dielectric → w ≈ 18 mil
//
// Layout rules:
// 1. Component placement: connectors first, then
//    power, then MCU, then peripherals
// 2. Route power planes first, then clocks,
//    then high-speed, then everything else
// 3. No traces under crystals
// 4. Keep analog grounds separate, connect at one point
// 5. Via stitching around high-speed signals
// 6. Thermal relief on ground pads for soldering`,
        codeLanguage: "text"
      }
    ],
    keyTakeaways: [
      "Decoupling capacitors on every IC — place them as close as possible",
      "Understand trace width vs. current capacity and impedance control",
      "Know the difference between LDO and switching regulators and when to use each",
      "Ground planes are essential for return current paths and EMC"
    ]
  },
  {
    slug: "automation-plc",
    category: "Automation & PLC",
    title: "Industrial Automation & PLCs",
    description: "PLC programming (ladder logic, structured text), SCADA systems, industrial protocols, safety standards, and PID control.",
    icon: "🏭",
    color: "orange",
    gradientFrom: "from-orange-500",
    gradientTo: "to-red-500",
    difficulty: "Intermediate",
    estimatedMinutes: 35,
    sections: [
      {
        title: "PLC Programming Languages",
        content: "PLCs are programmed using IEC 61131-3 languages: Ladder Logic (graphical, relay-style), Structured Text (Pascal-like), Function Block Diagram (graphical dataflow), Instruction List (assembly-like), and Sequential Function Chart (flowchart). Ladder Logic is most common in North America, while Structured Text is gaining popularity for complex logic.",
        code: `// Structured Text: PID-controlled temperature system
PROGRAM TemperatureControl
VAR
    setpoint     : REAL := 75.0;   // Target temp (°C)
    actual_temp  : REAL;            // Sensor reading
    output       : REAL;            // Heater duty cycle (0-100%)
    Kp           : REAL := 2.0;    // Proportional gain
    Ki           : REAL := 0.5;    // Integral gain
    Kd           : REAL := 0.1;    // Derivative gain
    error        : REAL;
    integral     : REAL := 0.0;
    derivative   : REAL;
    prev_error   : REAL := 0.0;
    dt           : REAL := 0.1;    // 100ms scan cycle
END_VAR

error := setpoint - actual_temp;
integral := integral + (error * dt);

// Anti-windup: clamp integral
IF integral > 100.0 THEN integral := 100.0; END_IF;
IF integral < -100.0 THEN integral := -100.0; END_IF;

derivative := (error - prev_error) / dt;
output := (Kp * error) + (Ki * integral) + (Kd * derivative);

// Clamp output to valid range
IF output > 100.0 THEN output := 100.0; END_IF;
IF output < 0.0 THEN output := 0.0; END_IF;

prev_error := error;`,
        codeLanguage: "pascal"
      },
      {
        title: "Industrial Communication Protocols",
        content: "Industrial automation uses specialized protocols: Modbus (RS-485, simple master-slave), EtherNet/IP (Ethernet-based, CIP), PROFINET (Siemens, real-time Ethernet), OPC UA (platform-independent, secure), and MQTT (lightweight IoT messaging). Understanding the OSI layer each operates on and their real-time capabilities is important.",
        code: `// Modbus RTU frame structure:
// [Address 1B][Function 1B][Data nB][CRC 2B]
//
// Common function codes:
// 0x01: Read Coils (digital outputs)
// 0x02: Read Discrete Inputs (digital inputs)
// 0x03: Read Holding Registers (R/W analog)
// 0x04: Read Input Registers (R/O analog)
// 0x06: Write Single Register
// 0x10: Write Multiple Registers
//
// Protocol comparison:
// Protocol     | Speed      | Deterministic | Complexity
// Modbus RTU   | 115.2kbps  | No           | Low
// Modbus TCP   | 100Mbps    | No           | Low
// EtherNet/IP  | 100Mbps    | Partial      | Medium
// PROFINET IRT | 100Mbps    | Yes (<1ms)   | High
// EtherCAT     | 100Mbps    | Yes (<100μs) | High`,
        codeLanguage: "text",
        tips: [
          "Modbus is the 'lingua franca' of industrial automation — know it well",
          "OPC UA is the modern standard for Industry 4.0 and IIoT",
          "Safety protocols (PROFIsafe, CIP Safety) run on top of standard fieldbus protocols"
        ]
      }
    ],
    keyTakeaways: [
      "Know the IEC 61131-3 languages, especially Ladder Logic and Structured Text",
      "Understand PID control tuning — it comes up in both automation and embedded interviews",
      "Be familiar with industrial protocols and when to use each",
      "Safety standards (IEC 61508, IEC 62443) are increasingly important"
    ]
  },
  {
    slug: "signal-processing",
    category: "Signal Processing",
    title: "Embedded Signal Processing",
    description: "ADC/DAC fundamentals, digital filtering (FIR/IIR), FFT, sampling theory, and DSP optimization for resource-constrained systems.",
    icon: "📊",
    color: "indigo",
    gradientFrom: "from-indigo-500",
    gradientTo: "to-violet-600",
    difficulty: "Advanced",
    estimatedMinutes: 45,
    sections: [
      {
        title: "Sampling Theory & ADC Fundamentals",
        content: "The Nyquist theorem states that the sampling rate must be at least 2× the highest frequency component to avoid aliasing. In practice, we sample at 5-10× to preserve signal fidelity. ADC specifications include resolution (bits), sampling rate (SPS), SNR, INL/DNL, and effective number of bits (ENOB). Anti-aliasing filters are essential before the ADC.",
        code: `// ADC key specifications:
// Resolution: n bits → 2^n quantization levels
// LSB = Vref / 2^n
// For 12-bit ADC, Vref = 3.3V:
//   LSB = 3.3V / 4096 = 0.806 mV
//
// SNR_ideal = 6.02n + 1.76 dB
// For 12-bit: SNR = 74 dB
//
// ENOB = (SINAD - 1.76) / 6.02
// Real 12-bit ADC might have ENOB = 10.5 bits

// STM32 ADC reading with oversampling for noise reduction
#define OVERSAMPLE_COUNT 16
#define OVERSAMPLE_SHIFT 2   // log2(16)/2 = 2 extra bits

uint16_t adc_read_oversampled(uint32_t channel) {
    uint32_t sum = 0;
    for (int i = 0; i < OVERSAMPLE_COUNT; i++) {
        ADC1->SQR3 = channel;
        ADC1->CR2 |= ADC_CR2_SWSTART;
        while (!(ADC1->SR & ADC_SR_EOC));
        sum += ADC1->DR;
    }
    return (uint16_t)(sum >> OVERSAMPLE_SHIFT);  // 14-bit result
}`,
        codeLanguage: "c"
      },
      {
        title: "Digital Filters: FIR & IIR",
        content: "FIR (Finite Impulse Response) filters have no feedback — they're inherently stable and have linear phase. IIR (Infinite Impulse Response) filters use feedback — they can achieve sharper rolloff with fewer coefficients but may be unstable. For embedded systems, fixed-point arithmetic is often necessary.",
        code: `// FIR low-pass filter (moving average is simplest FIR)
#define FIR_TAPS 16
static float fir_coeffs[FIR_TAPS] = { /* design with MATLAB/scipy */ };
static float fir_buffer[FIR_TAPS] = {0};
static int fir_index = 0;

float fir_filter(float input) {
    fir_buffer[fir_index] = input;
    float output = 0;
    int idx = fir_index;
    for (int i = 0; i < FIR_TAPS; i++) {
        output += fir_coeffs[i] * fir_buffer[idx];
        if (--idx < 0) idx = FIR_TAPS - 1;
    }
    fir_index = (fir_index + 1) % FIR_TAPS;
    return output;
}

// IIR: Second-order (biquad) section
// y[n] = b0*x[n] + b1*x[n-1] + b2*x[n-2]
//        - a1*y[n-1] - a2*y[n-2]
typedef struct {
    float b0, b1, b2, a1, a2;
    float x1, x2, y1, y2;  // State variables
} Biquad;

float biquad_process(Biquad *f, float x) {
    float y = f->b0*x + f->b1*f->x1 + f->b2*f->x2
              - f->a1*f->y1 - f->a2*f->y2;
    f->x2 = f->x1; f->x1 = x;
    f->y2 = f->y1; f->y1 = y;
    return y;
}`,
        codeLanguage: "c",
        tips: [
          "FIR = stable & linear phase, but needs more memory. IIR = efficient but can be unstable",
          "Use cascaded biquad sections for higher-order IIR filters — better numerical stability",
          "ARM CMSIS-DSP library provides optimized filter functions for Cortex-M"
        ]
      }
    ],
    keyTakeaways: [
      "Master Nyquist theorem and aliasing — always include anti-aliasing filters",
      "Know ADC specs: resolution, ENOB, SNR, sampling rate",
      "Understand FIR vs IIR trade-offs and when to use each",
      "Oversampling is a powerful technique to improve effective resolution"
    ]
  },
  {
    slug: "power-electronics",
    category: "Power Electronics",
    title: "Power Electronics for Embedded Systems",
    description: "Voltage regulators, battery management, MOSFET switching, motor control, and power efficiency optimization.",
    icon: "⚡",
    color: "yellow",
    gradientFrom: "from-yellow-500",
    gradientTo: "to-amber-600",
    difficulty: "Advanced",
    estimatedMinutes: 35,
    sections: [
      {
        title: "Voltage Regulators: Linear vs Switching",
        content: "Linear regulators (LDOs) work by dissipating excess voltage as heat. They're simple, low noise, but inefficient when Vin >> Vout. Switching regulators (buck, boost, buck-boost) use inductors and capacitors to convert voltage efficiently (85-95%) but introduce switching noise. Choose based on efficiency needs, noise requirements, and cost.",
        code: `// LDO power dissipation:
// P_dissipated = (Vin - Vout) × Iload
// Example: 5V → 3.3V at 500mA
// P = (5 - 3.3) × 0.5 = 0.85W (wasted as heat!)
// Efficiency = 3.3/5 = 66%
//
// Buck converter (step-down):
// Duty cycle: D = Vout / Vin
// Inductor: L = (Vin - Vout) × D / (ΔI × fsw)
// Example: 12V → 3.3V at 1A, fsw = 500kHz, ΔI = 300mA
// D = 3.3/12 = 0.275
// L = (12 - 3.3) × 0.275 / (0.3 × 500000) = 16μH
//
// Boost converter (step-up):
// D = 1 - (Vin / Vout)
// Example: 3.3V → 5V → D = 1 - 3.3/5 = 0.34
//
// When to use what:
// LDO:    Small Vin-Vout drop, low noise needed, < 500mA
// Buck:   High efficiency step-down, can tolerate ripple
// Boost:  Step-up required (battery to 5V, etc.)`,
        codeLanguage: "text"
      },
      {
        title: "MOSFET Switching & Motor Control",
        content: "MOSFETs are the workhorse of power electronics. N-channel MOSFETs are used for low-side switching, P-channel for high-side. Gate drive voltage must exceed Vgs(th) — use level shifters or gate drivers for high-side N-channel. PWM (Pulse Width Modulation) controls average power delivery and is essential for motor control, LED dimming, and switching converters.",
        code: `// PWM motor control with H-bridge
// H-bridge allows bidirectional motor control:
//   Q1  Q2       Q3  Q4
//   |---Motor---|
//   Forward: Q1+Q4 ON, Q2+Q3 OFF
//   Reverse: Q2+Q3 ON, Q1+Q4 OFF
//   Brake:   Q1+Q3 ON or Q2+Q4 ON (short motor)
//   Coast:   All OFF

// STM32 PWM configuration for motor control
void pwm_init(void) {
    // Timer 1, Channel 1 — 20kHz PWM
    RCC->APB2ENR |= RCC_APB2ENR_TIM1EN;
    TIM1->PSC = 0;                    // No prescaler
    TIM1->ARR = SystemCoreClock / 20000 - 1; // 20kHz
    TIM1->CCR1 = 0;                   // 0% duty cycle
    TIM1->CCMR1 = (6 << 4);          // PWM Mode 1
    TIM1->CCER = TIM_CCER_CC1E;      // Enable output
    TIM1->BDTR = TIM_BDTR_MOE;       // Main output enable
    TIM1->CR1 = TIM_CR1_CEN;         // Start timer
}

void set_motor_speed(uint8_t percent) {
    TIM1->CCR1 = (TIM1->ARR * percent) / 100;
}`,
        codeLanguage: "c"
      }
    ],
    keyTakeaways: [
      "Know when to use LDO vs switching regulator — it's a very common interview question",
      "Understand MOSFET selection: Vds, Rds(on), Vgs(th), and power dissipation",
      "PWM is fundamental — know how to generate it and calculate frequency/duty cycle",
      "H-bridges enable bidirectional motor control with 4 switching elements"
    ]
  },
  {
    slug: "system-design",
    category: "System Design",
    title: "Embedded System Design",
    description: "Architecture patterns, requirement analysis, hardware-software partitioning, testing strategies, and design trade-offs.",
    icon: "🏗️",
    color: "slate",
    gradientFrom: "from-slate-500",
    gradientTo: "to-gray-600",
    difficulty: "Advanced",
    estimatedMinutes: 50,
    sections: [
      {
        title: "System Architecture Patterns",
        content: "Common embedded architectures include: super-loop (bare-metal polling), interrupt-driven (event-based), RTOS-based (multi-task), and hybrid approaches. The choice depends on timing requirements, complexity, power budget, and team expertise. For interviews, be ready to design a system from requirements to architecture.",
        code: `// Pattern 1: Super Loop (simplest)
int main(void) {
    system_init();
    while (1) {
        read_sensors();
        process_data();
        update_outputs();
        check_communications();
    }
}

// Pattern 2: Timer-driven cooperative scheduling
typedef struct { void (*task)(void); uint32_t period_ms; uint32_t next_run; } Task;
Task tasks[] = {
    { read_sensors,     10,   0 },  // 100 Hz
    { process_data,     50,   0 },  // 20 Hz
    { update_display,   200,  0 },  // 5 Hz
    { check_comms,      1000, 0 },  // 1 Hz
};

void SysTick_Handler(void) {
    tick_count++;
    for (int i = 0; i < NUM_TASKS; i++) {
        if (tick_count >= tasks[i].next_run) {
            tasks[i].task();
            tasks[i].next_run = tick_count + tasks[i].period_ms;
        }
    }
}

// Pattern 3: State machine architecture
typedef enum { IDLE, SAMPLING, PROCESSING, TRANSMITTING, ERROR } State;

void state_machine(void) {
    static State state = IDLE;
    switch (state) {
        case IDLE:        state = check_trigger() ? SAMPLING : IDLE; break;
        case SAMPLING:    state = sample_done() ? PROCESSING : SAMPLING; break;
        case PROCESSING:  state = process_data() ? TRANSMITTING : ERROR; break;
        case TRANSMITTING: state = tx_done() ? IDLE : TRANSMITTING; break;
        case ERROR:       handle_error(); state = IDLE; break;
    }
}`,
        codeLanguage: "c",
        tips: [
          "Start interviews with requirements: real-time constraints, power budget, cost target",
          "Draw block diagrams first — show MCU, sensors, actuators, communication, power",
          "Always discuss testing strategy: unit tests, HIL, integration, field testing"
        ]
      },
      {
        title: "Design Trade-offs & Decision Framework",
        content: "Embedded system design is all about trade-offs. Common ones: MCU vs FPGA (flexibility vs determinism), polling vs interrupt (simplicity vs efficiency), bare-metal vs RTOS (overhead vs schedulability), and wired vs wireless (reliability vs convenience). Interviewers love to hear structured decision-making.",
        code: `// Decision framework for interviews:
//
// 1. REQUIREMENTS
//    - Hard real-time deadlines?
//    - Power budget (mW? μW?)
//    - Unit cost target?
//    - Safety certification needed?
//    - Environmental conditions?
//
// 2. ARCHITECTURE SELECTION
//    Requirements          → Architecture
//    Simple, low power     → Super loop + sleep modes
//    Multiple deadlines    → RTOS with priority tasks
//    <1μs response         → FPGA or dedicated hardware
//    Safety-critical       → Redundant MCU + watchdog
//
// 3. COMPONENT SELECTION
//    Sensor accuracy vs cost vs power
//    MCU: peripherals needed, RAM/Flash, MHz, ecosystem
//    Connectivity: range, bandwidth, power, security
//
// 4. VALIDATION PLAN
//    Unit tests → Integration → System → Field
//    WCET analysis for real-time tasks
//    EMC/EMI testing for certification
//    Stress testing: temperature, voltage, timing margins`,
        codeLanguage: "text"
      }
    ],
    keyTakeaways: [
      "Start with requirements and constraints — never jump to a solution",
      "Know the common architecture patterns and when to apply each",
      "Practice articulating trade-offs: cost, power, performance, complexity",
      "Always mention testing and validation — it shows engineering maturity"
    ]
  },
  {
    slug: "behavioral",
    category: "Behavioral",
    title: "Behavioral Interview Mastery",
    description: "STAR method, leadership principles, conflict resolution, and how to tell compelling stories about your embedded systems projects.",
    icon: "🎯",
    color: "pink",
    gradientFrom: "from-pink-500",
    gradientTo: "to-rose-600",
    difficulty: "Beginner",
    estimatedMinutes: 30,
    sections: [
      {
        title: "The STAR Method",
        content: "STAR (Situation, Task, Action, Result) is the gold standard for behavioral interviews. Situation: set the scene (project, team, constraints). Task: what was your specific responsibility. Action: what you personally did (use 'I', not 'we'). Result: quantifiable outcomes (saved X hours, reduced bugs by Y%, shipped on time).",
        code: `// STAR Framework Template:
//
// SITUATION: "On my senior capstone project, our team was
// building a wireless sensor network for environmental
// monitoring. Two weeks before the demo, our custom PCB
// arrived with a critical routing error on the SPI bus."
//
// TASK: "As the hardware lead, I needed to find a way
// to get the boards working without time to respin."
//
// ACTION: "I analyzed the routing error using the
// schematic and identified two crossed traces. I designed
// a rework procedure using wire jumpers, documented it
// step-by-step, and personally reworked all 5 boards.
// I also added DRC checks to our review process."
//
// RESULT: "All 5 boards worked on first power-up after
// rework. We delivered the demo on schedule and received
// the highest grade. The DRC checklist was adopted by
// the next year's teams."`,
        codeLanguage: "text"
      },
      {
        title: "Common Behavioral Questions & Frameworks",
        content: "Top companies (Tesla, Apple, Qualcomm, TI) ask behavioral questions to assess culture fit, problem-solving approach, and communication skills. Prepare 4-5 diverse stories that cover: technical challenge, teamwork/conflict, tight deadline, learning from failure, and leadership/initiative. Each story should map to multiple question types.",
        code: `// Story Bank Strategy:
// Prepare 5 stories, each mappable to 3+ question types:
//
// Story 1: "Debugging the intermittent CAN bus failure"
//   → Tell me about a difficult bug you solved
//   → When did you have to be persistent?
//   → How do you approach debugging?
//
// Story 2: "Convincing the team to switch from Arduino to STM32"
//   → Tell me about a time you influenced others
//   → When did you make an unpopular decision?
//   → How do you evaluate technology choices?
//
// Story 3: "Shipping the IoT prototype in 3 weeks"
//   → How do you handle tight deadlines?
//   → Tell me about a time you went above and beyond
//   → How do you prioritize when everything is urgent?
//
// Questions to ask YOUR interviewer:
// - "What does a typical project lifecycle look like?"
// - "How does the team handle hardware-software integration?"
// - "What's the most interesting technical challenge right now?"
// - "What testing infrastructure do you have?"`,
        codeLanguage: "text",
        tips: [
          "Quantify results whenever possible: 'reduced latency by 40%' beats 'made it faster'",
          "Practice out loud — behavioral answers should be 90-120 seconds, no rambling",
          "Have a failure story ready — what matters is what you learned and changed",
          "Research the company's products and tie your stories to their domain"
        ]
      }
    ],
    keyTakeaways: [
      "Prepare 5 STAR stories that cover different competencies",
      "Always quantify your impact — numbers are memorable",
      "Practice until answers flow naturally in 90-120 seconds",
      "Research the company and tailor your stories to their domain"
    ]
  }
];
