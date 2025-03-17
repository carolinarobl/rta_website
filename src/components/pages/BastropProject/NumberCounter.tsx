import { component$, useVisibleTask$ } from '@builder.io/qwik';
import Chart from 'chart.js/auto';

export default component$(({title, totalData, progressData, maxWidth, color}: {title: string, totalData: number, progressData: number, maxWidth?: string, color?:string}) => {
  const total = totalData;
  const progress = progressData; // Aquí pon el número real
  const maxW= maxWidth ?? '150px'
  const chartColor = color ?? '#2e5899'

  const percentage = ((progress / total) * 100).toFixed(1) + "%";

  useVisibleTask$(() => {
    const ctx = document.getElementById(title) as HTMLCanvasElement;
    if (!ctx) return;

    // plugin para mostrar el porcentaje en el centro
    const centerTextPlugin = {
      id: "centerText",
        beforeDraw: (chart: any) => {
            const { width } = chart;
            const { height } = chart.chartArea;
            const ctx = chart.ctx;
            ctx.save();
            ctx.font = "normal 20px Plus Jakarta Sans";
            ctx.fillStyle = "#2e5899";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(percentage, width / 2, height / 2);
            ctx.restore();
          }
        };

    new Chart(ctx, {
      type: "doughnut",
      data: {
        // labels: ["Completed", "Pending"],
        datasets: [
          {
            data: [progress, total - progress],
            backgroundColor: [chartColor, "#ddd"],
            borderWidth: 0,
            borderRadius: 4,
            borderJoinStyle: 'round',
            spacing: 2,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: "80%",
        animation:{
          animateScale: true,
          duration: 6000
        },
        plugins: {
          tooltip: { enabled: true },
          legend: { display: true },
        },
      },

      plugins: [centerTextPlugin],

    });
  });

  return (
    <div class="flex flex-col items-center justify-around">
          <h3 class="text-[18px] font-light text-center">{title}</h3>
          <div class={`w-full max-w-[${maxW}]`}>
          <canvas id={title}></canvas>
          </div>
      </div>
  );
});
