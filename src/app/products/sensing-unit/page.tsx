import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HardwareSensingProduct from '@/components/products/HardwareSensingProduct'

export const metadata = {
  title: "IndusEye RS3 | Auto Spa & High-Duty Access Hardware | 22-Automations",
  description: "Precise Identification, Autonomous Flow. Engineered for Auto Spa's & High-Duty Access. 24 GHz millimeter-wave radar, HD cat-eye camera, and 1000 lb holding force."
}

export default function SensingUnitPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />

      {/* Main Hardware Sensing Product Content */}
      <main className="flex-1">
        <HardwareSensingProduct />
      </main>

      <Footer />
    </div>
  )
}
